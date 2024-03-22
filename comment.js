// Create web server and listen on port 3000
// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const comment = require('./comment');

// Use body-parser to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a comment
app.post('/comment', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send('Missing fields');
    }
    const newComment = {
        name,
        email,
        message
    };
    comment.addComment(newComment);
    res.send('Comment added');
});

// Get all comments
app.get('/comment', (req, res) => {
    res.send(comment.getAllComments());
});

// Get a comment by email
app.get('/comment/:email', (req, res) => {
    const email = req.params.email;
    const foundComment = comment.getCommentByEmail(email);
    if (!foundComment) {
        return res.status(404).send('Comment not found');
    }
    res.send(foundComment);
});

// Update a comment by email
app.put('/comment/:email', (req, res) => {
    const email = req.params.email;
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).send('Missing fields');
    }
    const updatedComment = comment.updateCommentByEmail(email, name, message);
    if (!updatedComment) {
        return res.status(404).send('Comment not found');
    }
    res.send('Comment updated');
});

// Delete a comment by email
app.delete('/comment/:email', (req, res) => {
    const email = req.params.email;
    const deletedComment = comment.deleteCommentByEmail(email);
    if (!deletedComment) {
        return res.status(404).send('Comment not found');
    }
    res.send('Comment deleted');
});

// Start web server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

Run the web server:

```
$ node comment.js
Server is running on http://localhost:3000
```

## Test the REST API

Use Postman to test the
