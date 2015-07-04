/*jslint node: true, indent: 2,nomen:true */
'use strict';

var express = require('express');
var router = express.Router();
var User = require('../mongoose_models/user');

/* GET users listing. */
/*jslint unparam: true */
router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return console.error(err);
    }
    res.send(users);
  });
});
/*jslint unparam: false */

/*jslint unparam: true */
// GET / CONSULTA
router.get('/:username', function (req, res) {
  User
    .findOne(
      { username: req.params.username },
      function (err, user) {
        console.log(user);
        if (err) {
          return console.error(err);
        } else if (user === null) {
          res
          .status(402);
          .send({ success: false, message: "User not found" });
        } else {
          res.send(user);
        }
      }
    );
});
/*jslint unparam: false */

// CREATE
router.post('/', function (req, res) {
  console.log(req.body);
  var user = new User({
    username: req.body.username,
    mail: req.body.mail
  });

  user.save(function (err, user) {
    console.log(user);
    if (err) {
      return console.error(err);
    }
    res
      .status(200);
      .send({ success: true, _id: user._id });
  });
});

// DELETE
router.delete('/:username', function (req, res) {
  User
    .remove(
      { username: req.params.username },
      function (err, user) {
        if (err) {
          return console.error(err);
        } else if (user.result.n === 1) {
        res
        .status(200);
        .send({ success: true, _id: user._id });
        } else {
          res
          .status(402);
          .send({ success: false, message: "User not found" });
        }
      }
    );
});

// UPDATE
router.patch('/:username', function (req, res) {
  User
    .findOneAndUpdate({ username: req.params.username },
      { mail: req.body.mail }, {new: true},
      function (err, user) {
        console.log(user);
        if (err) {
          return console.error(err);
        } else if (user === null) {
          res
          .status(402);
          .send({ success: false, message: "User not found" });
        } else {
          res
          .status (202);
          .send({ success: true, mail: user.mail });
        }
      }
    );
});

module.exports = router;












