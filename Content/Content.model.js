const mongoose = require('mongoose');

var chapterSchema = mongoose.Schema(
    {
        chapterNumber: {
            type: Number,
        },
        title: {
            type: String,
            maxlength: 128,
        },
        description: {
            type: String,
        },
        cover: {
            type: String,
        }
    }
);

var contentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 64,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
        },
        chapters: [chapterSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);