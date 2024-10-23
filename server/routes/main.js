import express from "express";
import Post from "../models/post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
    try {
        const blogPosts = await Post.getAllPosts();
        res.render('pages/index',{ blogPosts, layout: "./pages/index" })
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching blog posts');
    }
});

// POST  create new post
router.post("/", async (req, res) => {
    const { title, content, category, tags } = req.body;
    try {
        await Post.createPost(title, content, category, tags);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating a new post');
    }
});

// GET a single post or edit page
router.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const action = req.query.action;
    try {
        const post = await Post.getPostById(postId);
        if (!post) {
            return res.status(404).send('Post not found');
        }
        if (action === 'edit') {
            res.render('pages/edit', { post, layout: "./pages/edit" });
        } else {
            res.render('pages/post', { post, layout: "./pages/post" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching the post');
    }
});


// PUT router handler for updating a post
router.put("/:id", async (req, res) => {
    const postId = req.params.id;
    const { updatedTitle, updatedContent, updatedCategory, updatedTags } = req.body;

    try {
        await Post.updatePost(postId, updatedTitle, updatedContent, updatedCategory, updatedTags.split(','));
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating the post');
    }
});

// DELETE router handler for deleting a post
router.delete("/:id", async (req, res) => {
    const deleteId = req.params.id;
    try {
        await Post.deletePost(deleteId);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting the item selected", error.stack);
    }
});

router.get("/", async (req, res) => {
    const searchTerm = req.query.search || '';
    try {
        const blogPosts = await Post.searchItems(searchTerm);
        if (req.xhr) {
            res.render('pages/index', { blogPosts, layout: false });
        } else {
            res.render('pages/index', { blogPosts });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching blog posts');
    }
});



export default router;