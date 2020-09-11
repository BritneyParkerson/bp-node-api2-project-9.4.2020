const express = require('express');
const server = express();
const postRouter = require('./data/postRouter.js');




server.use(express.json());
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
    res.send('<h2> Welcome to the Year 3000! <h2> <p> Not much has changed but we live under water! **Pst: Jonas brothers were right!** ')
});





module.exports = server; 