var restify = require('restify');
var jf = require('jsonfile');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

function getAllUsers(req, res, next) {
	var data = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "userName": "cc",
            "email":  "cox@carney.se",
            "createdDate": "2014-01-01",
            "access": "true"
        },
        {
            "firstName": "Thomas",
            "lastName": "Bindzau",
            "userName": "tb",
            "email":  "thomas@bindzau.se",
            "createdDate": "2014-08-04",
            "access": "false"
        },
        {
            "firstName": "John",
            "lastName": "Doe",
            "userName": "jd",
            "email":  "john@doe.se",
            "createdDate": "2014-06-12",
            "access": "true"
        }];
	res.send(data);
  /*
  jf.readFile('userDBMock.json', function(err, obj) {
		if (err){
			console.log('Error:' + err);
		}

  		res.send(obj);
	});
*/
  next();
}

server.get('/users', getAllUsers);
server.head('/users', getAllUsers);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(8080, function() {
	debugger;
  console.log('%s listening at %s', server.name, server.url);
});