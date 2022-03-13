const mongoose = require('mongoose');

var userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 64,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        blocked: {
            type: Boolean,
            default: false,
        },
        gender: {
            type: String,
            default: "male",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);