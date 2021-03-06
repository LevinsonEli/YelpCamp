var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    createdAT:{
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
