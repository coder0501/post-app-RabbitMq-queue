
// routes/blogPosts.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');

// Create a new blog post 
router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new BlogPost({
      title,
      content,
      author: req.user.userId
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific blog post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a blog post
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('post.author',post.author.toString());
    console.log('userId',req.user.userId);

    if (post.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    post.title = title;
    post.content = content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a blog post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    console.log('post.author',post.author.toString());
    console.log('userId',req.user.userId);

    if (post.author.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await BlogPost.deleteOne({ _id: req.params.id });
    res.json({ message: 'Post removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment to a blog post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      text: req.body.text,
      author: req.user.userId
    };
    post.comments.push(comment);
    await post.save();

    res.status(201).json(post.comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Like or unlike a blog post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user.userId;
    const index = post.likes.indexOf(userId);
    if (index === -1) {
      post.likes.push(userId); // Like the post
    } else {
      post.likes.splice(index, 1); // Unlike the post
    }

    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch user's own posts
// router.get('/userposts', auth, async (req, res) => {
//   try {
//     console.log('req.user.userId',req.user.userId)

//     const posts = await BlogPost.find({ author: req.user.userId });
//     console.log('posts',posts);
//     console.log('req.user.userId',req.user.userId)
//     res.json(posts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

module.exports = router;

