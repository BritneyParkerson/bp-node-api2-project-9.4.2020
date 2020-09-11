const express = require('express');
const Post = require('./db.js')

const router = express.Router();




router.get('/',(req, res) => {
    console.log(req.query);
    Post.find(req.query)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        res.status(500).json({
            message: "Post cannot be retrieved"
        });
    });
});


router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Could not locate post' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Post cannot be retrieved',
            });
        });
});

router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await Post.findPostComments(req.params.id);

        if (comments.length > 0) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({ message: 'This post does not have a comment thread' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Post comments cannot be retrieved',
        });
    }
});

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Post could not be added',
            });
        });
});


router.post('/:id/comments', async (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id };

    try {
        const comment = await Post.insertComment(commentInfo);
        res.status(201).json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
})

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'Post Deleted' });
            } else {
                res.status(404).json({ message: 'Post could not be located' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not delete post',
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Post.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'Post cannot be retrieved' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Could not update post',
            });
        });
});

module.exports = router; 