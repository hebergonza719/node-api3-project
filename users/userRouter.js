const express = require('express');

const router = express.Router();

const userDb = require('./userDb.js');

const postDb = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the the user' });
    });
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  const { id } = req.params;

  const newPost = req.body;

  postDb.insert({...newPost, "user_id": id})
    .then(message => {
      res.status(210).json({ message })
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't update data" })
    });
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
    .then(data => {
      res.status(200).json({ data })
    })
    .catch(err => {
      res.status(500).json({ error: "Error retrieving data" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ error: "Couldn't retrieve data" });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: 'The user has been deleted' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error removing user" })
    })
});

router.put('/:id', [validateUserId, validateUser], (req, res) => {
  // do your magic!
  userDb.update(req.params.id, req.body)
    .then(count => {
      if(count > 0) {
        res.status(200).json(req.body);
      } else {
        res.status(404).json({ error: "The user could not be updated" })
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'The user could not be found' })
    });
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

  if(Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if(!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  };
};

function validatePost(req, res, next) {
  // do your magic!
  if(Object.entries(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if(!req.body.text || req.body.text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  };
};

module.exports = router;
