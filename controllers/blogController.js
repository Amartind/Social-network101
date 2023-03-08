const { Blog, User } = require("../models");

module.exports = {
    // Get all blogs
    getBlogs(req, res) {
        Blog.find()
            .then((blogs) => res.json(blogs))
            .catch((err) => res.status(500).json(err));
    },

    // Get a single blog by _id
    getSingleBlog(req, res) {
        Blog.findOne({ _id: req.params.blogId })
            .select("-__v")
            .then((blog) =>
                !blog
                    ? res
                          .status(404)
                          .json({ message: "No blog with that ID" })
                    : res.json(blog)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Create a blog
    createBlog(req, res) {
        Blog.create(req.body)
            .then((blog) => res.json(blog))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a blog
    deleteBlog(req, res) {
        Blog.findOneAndDelete({ _id: req.params.blogId })
            .then((blog) =>
                !blog
                    ? res
                          .status(404)
                          .json({ message: "No blog with that ID" })
                    : User.deleteMany({ _id: { $in: blog.users } })
            )
            .then(() => res.json({ message: "Blog deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // Update a blog
    updateBlog(req, res) {
        Blog.findOneAndUpdate(
            { _id: req.params.blogId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((blog) =>
                !blog
                    ? res
                          .status(404)
                          .json({ message: "No blog with this id!" })
                    : res.json(blog)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Add an reaction to a blog
    addReaction(req, res) {
        console.log("You are adding a reaction");
        console.log(req.body);
        Blog.findOneAndUpdate(
            { _id: req.params.blogId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((blog) =>
                !blog
                    ? res
                          .status(404)
                          .json({ message: "No blog found with that ID" })
                    : res.json(blog)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Remove reaction from a blog
    removeReaction(req, res) {
        Blog.findOneAndUpdate(
            { _id: req.params.blogId },
            {
                $pull: {
                    reactions: { reactionId: req.params.reactionId },
                },
            },
            { runValidators: true, new: true }
        )
            .then((blog) =>
                !blog
                    ? res
                          .status(404)
                          .json({ message: "No blog found with that ID" })
                    : res.json(blog)
            )
            .catch((err) => res.status(500).json(err));
    },
};