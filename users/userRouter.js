const express = require('express');

const router = express.Router();

const userDb = require('./userDb.js');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  userDb.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception', err });
    });
};

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body || req.body === {}) {
    res.status(400).json({ message: "missing user data" });
  } else if(!req.body.name || req.body.name === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  };
};

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body || req.body === {}) {
    res.status(400).json({ message: "missing post data" });
  } else if(!req.body.text || req.body.text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  };
};

module.exports = router;
