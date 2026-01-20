const express = require("express");
const Blog = require("../models/Blog");
const auth = require("../middleware/authMiddleware");
const { default: mongoose } = require("mongoose");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// when we are on blog page
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blogs" });
    }
});

// my blogs og logged in user
router.get("/my", authMiddleware, async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user.id }).sort({
            createdAt: -1,
        });
        res.json(blogs);
    } catch (error) {
        console.error("MY BLOGS ERROR:", error);
        res.status(500).json({ message: "Failed to fetch my blogs" });
    }
});

// when we are in specific blog on blog page
router.get("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }
    try {
        const blog = await Blog.findById(req.params.id).populate(
            "author",
            "name email"
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch blog" });
    }
});

// For updating the specific blog
router.put("/:id", authMiddleware, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }
    try {
        const blogs = await Blog.findById(req.params.id);

        if (!blogs) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blogs.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        blogs.title = req.body?.title || blogs.title;
        blogs.content = req.body?.content || blogs.content;

        const updatedBlog = await blogs.save();
        res.json(updatedBlog);
    } catch (error) {
        console.error("UPDATE BLOG ERROR:", error);
        res.status(500).json({ message: "Failed to update blog" });
    }
});

// when we have to delete the blog
router.delete("/:id", authMiddleware, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("DELETE BLOG ERROR:", error);
        res.status(500).json({ message: "Failed to delete blog" });
    }
});

// for creating the blog
router.post("/", auth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.create({
            title,
            content,
            author: req.user.id,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Failed to create blog" });
    }
});

module.exports = router;
