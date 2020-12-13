// user functionality will reside in the controller files

const { User } = require('../models');

// define userController object with methods
const userController = {

    // get all users
    getAllUsers(req, res) {
        User.find({})
            // populate is similar to joining sql tables
            // chain 'populate' method onto the query by passing in an object with the 'path' key
            // and the value of the field we want to populate
            .populate({
                path: 'thoughts',
                // select option tells mongoose that we don't care about the __v field on comments by using the '-' sign
                select: '-__v'
            })
            // don't include the __v field in our user object
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // get one user by id
    // destructure 'params' out of the express.js req object so that we don't have to access the entire req
    getUserById({ params }, res) {
        // mongoose's find a single dataset
        // parameter is like the "where" is mysql
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // If no user is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        // first parameter is the "where" clause
        // second paramater is the updated data
        // third paramter of { new: true } returns an updated version of the document rather than the original
        // add runValidators to make sure that the validator also runs when we update something 
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;