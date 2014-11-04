var restify = require('restify');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var secret = require('./secret');
var server = restify.createServer();

server.use(restify.bodyParser());

//Used to be able to handle cross origins
server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

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

server.get('/users', getAllUsers);
server.head('/users', getAllUsers);

server.post('/login', login);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});