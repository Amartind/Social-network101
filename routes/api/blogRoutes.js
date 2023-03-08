const router = require("express").Router();
const {
    getBlogs,
    getSingleBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    addReaction,
    removeReaction,
} = require("../../controllers/blogController.js");

// /api/blogs
router.route("/").get(getBlogs).post(createBlog);

// /api/blogs/:blogId
router
    .route("/:blogId")
    .get(getSingleBlog)
    .put(updateBlog)
    .delete(deleteBlog);

// /api/blogs/:blogId/reactions
router.route("/:blogId/reactions").post(addReaction);

// /api/blogs/:blogId/reactions/:reactionId
router.route("/:blogId/reactions/:reactionId").delete(removeReaction);

module.exports = router;