var restify = require('restify');
var fs = require('fs');

var server = restify.createServer();

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

server.get('/users', getAllUsers);
server.head('/users', getAllUsers);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});