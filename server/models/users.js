var db = require('../db.js');
var bcrypt = require('bcrypt-nodejs');


var User = module.exports

User.findByUsername = function (username) {
  return db('users').where({ username: username }).limit(1)
    .then(function (rows) {
      return rows[0]
    })
}

User.findById = function (id) {
  return db('users').where({ id: id }).limit(1)
    .then(function (rows) {
      return rows[0]
    })
}

User.create = function (incomingAttrs) {

  // Copy object to avoid mutation
  console.log("inside user.create! :", incomingAttrs);
  var attrs = Object.assign({}, incomingAttrs);


  return hashPassword(attrs.password)
    .then(function (passwordHash) {

      attrs.password = passwordHash;
      // delete attrs.password
      console.log("inside hashPassword! :", attrs);
      return db('users').insert(attrs)
    })
    .then(function () { 
      return db('users').select('id').where('username', '=', attrs.username)
        .then(function(selected) {
          return selected[0].id;
        })
      // console.log("immediately after insert:", result);
      // // Prepare new user for the outside world
      // attrs.id = result[0];
      // return attrs;
    })
    .catch(function(err) {
      console.log("error inserting new user! :", err);
    })
  };

User.comparePassword = function (passwordHashFromDatabase, attemptedPassword) {

  return new Promise(function (resolve, reject) {

    bcrypt.compare(attemptedPassword, passwordHashFromDatabase, function(err, res) {
      if (err) reject(err)
      else     resolve(res)
    });
  })
  };

function hashPassword (password) {

  return new Promise(function (resolve, reject) {

    bcrypt.hash(password, null, null, function(err, hash) {
      if (err) reject(err)
      else     resolve(hash)
    });
  })
  };