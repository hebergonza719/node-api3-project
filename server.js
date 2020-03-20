const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json());

// server.use(helmet());

server.use(logger);

// Routers

const userRouter = require('./users/userRouter');

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Node-API3-Project<h1>
  `);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} - Method`);
  console.log(req.protocol + "://" + req.get('host') + req.url);
  console.log("Timestamp " + Date.now());
  next();
};

module.exports = server;