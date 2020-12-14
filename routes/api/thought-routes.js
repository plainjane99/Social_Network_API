const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
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

// routes at /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .post(addReaction)
    .put(updateThought)
    .delete(removeThought);

// routes at /api/thoughts/:userId/:thoughtId/:reactionId
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;