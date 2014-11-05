var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var server = express();

server.use(bodyparser());

server.options('*', cors());

function getAllUsers(req, res, next) {
  //This will be replaced by call to SQL server DB
  var data = JSON.parse(fs.readFileSync('userDBMock.json', 'utf8'));
  console.log('Data:' + data);
  res.send(data);
  next();
}

function login(req, res, next) {
  console.log('Trying to log in');
  var username = req.body.username;
  var password = req.body.password;
  if (password=='ok'/*Check credentials!*/) {
      var token = jwt.sign({id: username}, secret.secretToken, { expiresInMinutes: 60 });

      console.log('Token created: %s', token);      
//      return res.json({token:token});

    console.log('User %s logged in', username);
    res.send(res.json({token:token}));
  }
  else {
    console.log('User %s failed to log in', username);
    res.send(401); //Login failed   
  }
  res.end();
  return  next();
}

server.get('/users', cors(), getAllUsers);

server.post('/login', cors(), login);

server.listen(8083, function() {
  console.log('%s listening at %s', server.name, server.url);
});