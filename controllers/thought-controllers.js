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
    getThoughtById({ params, body }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // add Thought to specific User id
    addThought({ params, body }, res) {
        // create the Thought object...
        Thought.create(body)
            // ...then pull out the new id from the Thought object...
            .then(({ _id }) => {
                // ...and add it to our associated User object...
                return User.findOneAndUpdate(
                    { _id: params.userId },
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
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
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
        Thought.findOneAndDelete({ _id: params.thoughtId })
            // deletes the Thought by id...
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                // ...then takes the returned data and removes it from the User object
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    // 'pull' function to remove the data
                    { $pull: { thoughts: params.thoughtId } },
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
    },

    // add a reaction by updating an existing thought 
    addReaction({ params, body }, res) {
        // find thought and update it
        Thought.findOneAndUpdate(
            // where statement
            { _id: params.thoughtId },
            // add the data to the array
            { $push: { reactions: body } },
            // return the updated thought
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove a reaction
    // delete the reaction and update the thought
    removeReaction({ params }, res) {
        // finds the thought document and updates it
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            // remove the specific reaction from the thought array
            { $pull: { reactions: { reactionId: params.reactionId } } },
            // returns the updated thought object
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

};

module.exports = thoughtController;