const router = require('express').Router();

// import all of the controller functions
// destructure the methods from the object so that we can use the methods by their direct names
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    // provide the name of the controller method as the callback of each route
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    // provide the name of the controller method as the callback of each route
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;