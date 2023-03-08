const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const blogSchema = new Schema(
    {
        blogText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

blogSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Blog = model("blog", blogSchema);
module.exports = Blog;