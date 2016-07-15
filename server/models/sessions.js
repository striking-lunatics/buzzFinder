var db = require('../db.js');
var uuid = require('node-uuid');


var Session = module.exports

Session.create = function (userId) { 

  console.log("inside session.create!");

  var newSession = { id: uuid(), user_id: userId } 

  console.log("showing new session info:", newSession);

  return db('sessions').insert(newSession)
    .then(function () {
      return newSession
    })
  }

Session.findById = function (sessionId) {

  return db('sessions').where({ id: sessionId })
    .then(function (rows) {
      return rows[0]
    })
  }

Session.destroy = function (sessionId) {
  return db('sessions').where({ id: sessionId }).del()
}
