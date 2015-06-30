/*jslint node: true, indent: 2,nomen:true */
'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  mail: String
});

module.exports = mongoose.model('User', userSchema);