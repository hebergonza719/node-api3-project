const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json());

server.use(helmet());

server.use(logger);

// Routers

const userRouter = require('./users/userRouter');

server.use('/api/users', userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} - Method`);
  console.log(`${req.params} - URL` );
  console.log(Date.now());
  next();
};

module.exports = server;