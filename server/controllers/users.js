var mongoose = require('mongoose');
var User = mongoose.model("User");
var Bicycle = mongoose.model("Bicycle");

module.exports = {
	login: function(req, res){
		User.findOne({email:req.body.email},function(err,user){
			if(err){
				console.log(err);
				res.json({message:err});
			}
			else{
				console.log(req.body);
				if(user){
					console.log(user.password);
					if(user.password == req.body.password){
						res.json({message:'success',user:user});
					}
				}
				else{
					res.json({message:'invalid'})
				}
			}
		})

	},
	logoff: function(req, res){

	},
	register: function(req, res){
		var user = new User(req.body);
		user.save(function(err){
			if(err){
				console.log(err);
				res.json({message:err});
			}
			else{
				console.log(user);
				res.json({message:'success',user:user});
			}
		})

	}
}	