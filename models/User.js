// use the schema constructor and model function from mongoose
const { Schema, model } = require('mongoose');

// schema definition
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                // expect an ObjectId from the Thought model
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                // expect an ObjectId from the User model
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    // use virtuals
    {
        toJSON: {
            virtuals: true,
        },
        // set to false because this is a virtual
        id: false
    }
);

// add virtual properties to get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;