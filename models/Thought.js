const { Schema, model, Types } = require('mongoose');

const dateFormat = require('../utils/dateFormat');

// just schema required since reaction data will never be queried directly
// const ReactionSchema = new Schema(
//     {
//         // unique identifier needed to avoid confusion with parent _id
//         reactionId: {
//             type: Schema.Types.ObjectId,
//             default: () => new Types.ObjectId()
//         },
//         reactionBody: {
//             type: String,
//             required: true,
//             minlength: 1,
//             maxlength: 280,
//             trim: true
//         },
//         username: {
//             type: String,
//             required: true
//         },
//         createdAt: {
//             type: Date,
//             default: Date.now,
//             get: createdAtVal => dateFormat(createdAtVal)
//         }
//     },
//     {
//         toJSON: {
//             getters: true
//         }
//     }
// );

// define the thought schema 
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        }
        // associate reactions with thoughts
        // populate with an array of data that adheres to the ReactionSchema definition
        // reactions will be nested directly in a thought's document and not referred to
        // reactions: [ReactionSchema]
    },
    {
        toJSON: {
            // virtuals: true,
            getters: true
        },
        id: false
    }
);

// ThoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;