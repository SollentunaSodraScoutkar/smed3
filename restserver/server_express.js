var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var auth = require('./authentication');
var server = express();

server.use(bodyparser());

server.options('*', cors());

function getAllUsers(req, res, next) {
    if (true){
//  if (auth.verifyToken(req)){
    //This will be replaced by call to SQL server DB
    var data = JSON.parse(fs.readFileSync('userDBMock.json', 'utf8'));
    res.send(data);
    next();    
  }
  else {
    console.log("unauthorized!");
    res.sendStatus(401);
    next();
  }
}

function login(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if (password=='ok'/*Check credentials!*/) {
      var token = jwt.sign({id: username}, secret.secretToken, { expiresInMinutes: 60 });
      auth.storeToken(token);

      console.log('User %s logged in', username);
      res.send({token:token});
  }
  else {
    console.log('User %s failed to log in', username);
    res.send(401); //Login failed   
  }
  res.end();
  return  next();
}

server.get('/users', cors(), auth.verifyToken, getAllUsers);

server.post('/login', cors(), login);

server.listen(8083, function() {
  console.log('%s listening at %s', server.name, server.url);
});