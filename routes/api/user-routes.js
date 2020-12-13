const router = require('express').Router();

// import all of the controller functions
// destructure the methods from the object so that we can use the methods by their direct names
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// routes at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// routes at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// routes at /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;