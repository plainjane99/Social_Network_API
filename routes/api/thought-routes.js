const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
    // addReaction,
    // removeReaction
} = require('../../controllers/thought-controllers');

// routes at /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// routes at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById);

// routes at /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

router
    .route('/:userId/:thoughtId')
    // .put(addReaction)
    .put(updateThought)
    .delete(removeThought);

// include the ids of the parent resources in the endpoint
// router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;