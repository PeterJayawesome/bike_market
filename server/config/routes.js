var users = require('../controllers/users.js');
var bicycles = require('../controllers/bicycles.js');
var path = require('path');

module.exports = function(app){
	app.post("/login",users.login)
	app.post("/register",users.register)
	app.get("/bicycles/all",bicycles.all)
	app.get("/bicycles/search/:title",bicycles.search)
	app.get("/users/:id/bicycles",bicycles.list)
	app.post("/users/:id/create",bicycles.create)
	app.put("/users/:uid/bicycles/:bid",bicycles.update)
	app.delete("/users/:uid/bicycles/:bid",bicycles.delete)
	app.get("/logoff",users.logoff)
	app.get("/bicycles/pickone",bicycles.pickone)
	app.get("/bicycles/user/:id",bicycles.contact)

	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './client/dist' });
	})
}