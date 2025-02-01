const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('./../model/admin');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/elecdb');

// Register Admin
router.post('/', (req, res) => {
  Admin.findOne({ username: req.body.username }, (err, data) => {
    if (!data) {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        let data = {
          username: req.body.username,
          password: hash,
        };
        const rec = new Admin(data);
        rec.save((err) => {
          if (!err) res.send({ response: 'Record Saved', st: 1 });
          else res.send({ response: 'Error in Code',err, st: 0 });
          console.log(err);
        });
      });
    } else {
      res.send({ response: 'Account Already Exists', st: 0 });
    }
  });
});


// Login
router.post('/login', (req, res) => {
  Admin.findOne({ username: req.body.username }, (err, data) => {
    if (!data) {
      res.send({ response: 'Incorrect User Name', st: 0 });
    } else {
      bcrypt.compare(req.body.password, data.password, function (err, result) {
        if (result)
          res.send({ response: 'Welcome admin', st: 1, adminId: data._id });
        else res.send({ response: 'Incorrect Password', st: 0 });

      });
    }
  });
});

module.exports = router;
