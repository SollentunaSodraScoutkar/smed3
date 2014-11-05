var storage = require('node-hashtable');

exports.storeToken = function (token){
	console.log("Setting Token");
	storage.set(token, "TODO: set expiration");
};

exports.verifyToken = function (req, res, next){
	var token = req.headers.authorization;
	var data = storage.get(token);
	if (data==null){
		console.log("Failed to get token!");
		res.sendStatus(401);
	}
	else{
		console.log("ok");
		next();
	}
};

exports.removeToken = function (token){
	storage.delete(token);
};