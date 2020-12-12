const { Thought, User } = require('../models');

// define thoughtController with methods
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.json(err);
            });
    },

    // get a single thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // add Thought to specific User id
    addThought(req, res) {

    // addThought({ params, body }, res) {
        // console.log(params);
        // create the Thought object...
        Thought.create(req.body)
            // ...then pull out the new id from the Thought object...
            .then(({ _id }) => {
                // ...and add it to our associated User object...
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    // 'push' to thoughts array
                    { $push: { thoughts: _id } },
                    // return updated User object with Thought 
                    { new: true }
                );
            })
            // ...return the User promise...
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update a Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // remove a Thought from the database but also from the User object
    removeThought({ params }, res) {
        // finds the Thought document while also returns the data
        Thought.findOneAndDelete({ _id: params.ThoughtId })
            // deletes the Thought by id...
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                // ...then takes the returned data and removes it from the User object
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    // 'pull' function to remove the data
                    { $pull: { Thoughts: params.ThoughtId } },
                    // return the updated User object that does not have the deleted Thought
                    { new: true }
                );
            })
            // return our User data
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }

};

module.exports = thoughtController;