var mongoose = require('mongoose');
var Bicycle = mongoose.model('Bicycle');
var User = mongoose.model('User');

module.exports = {
	all: function(req, res){
		Bicycle.find({},function(err,bikes){
			if(err){
				console.log(err);
			}
			else{
				res.json({bikes:bikes});
			}
		})

	},
	pickone: function(req, res){
		Bicycle.find({}).limit(4).exec(function(err,bikes){
			if(err){
				console.log(err);
			}
			else{
				res.json(bikes);
			}
		})
	},
	search: function(req,res){
		var regexp = new RegExp(req.params.title,'i');
		Bicycle.find({$or: [{title: regexp},
						   {description: regexp}
			]},
			function(err,bikes){
			if(err){
				console.log(err);
			}
			else{
				res.json({bikes:bikes});
			}
		})

	},
	create: function(req, res){
		User.findOne({_id:req.params.id},function(err,user){
			if(err){
				console.log(err);
			}
			else{
				if(user){
					var bike = new Bicycle(req.body);
					console.log("user ID: ",user._id);
					bike._user = req.params.id;
					// console.log(bike);
					bike.save(function(err){
						if(err){
							// console.log(bike);
							console.log("bike save err: ",err);
						}
						else{
							user._bicycles.push(bike);
							user.save(function(err){
								if(err){
									console.log("user save err: ",err);
								}
								res.redirect('/users/'+user._id+"/bicycles");
							})
						}
					})
				}
				else{
					res.json({err:"no such user"});
				}
			}
		})
	},
	update: function(req, res){
		// console.log("get data: ",req.body);
		User.findOne({_id:req.params.uid}).populate("_bicycles").exec(function(err,user){
			if(err){
				console.log(err);
			}
			else if(user){
				for(var bike of user._bicycles){
					if(bike._id == req.params.bid){
						// console.log(bike);
						Bicycle.update({_id:req.params.bid},{$set:req.body},function(err){
							if(err){
								console.log(err);
							}
							// console.log(req.body);
						})
						break;
					}
				}
				res.redirect(303,'/users/'+user._id+"/bicycles");
			}
		})

	},
	delete: function(req, res){
		// console.log("get data: ",req.body);
		User.findOne({_id:req.params.uid}).populate("_bicycles").exec(function(err,user){
			if(err){
				console.log(err);
			}
			else if(user){
				for(var bike of user._bicycles){
					if(bike._id == req.params.bid){
						// console.log(bike);
						Bicycle.remove({_id:req.params.bid},function(err){
							if(err){
								console.log(err);
							}
							// console.log(req.body);
						})
						break;
					}
				}
				res.redirect(303,'/users/'+user._id+"/bicycles");
			}
		})

	},
	list: function(req, res){
		User.findOne({_id:req.params.id}).populate("_bicycles").exec(function(err,user){
			if(err){
				console.log(err);
				res.json({err:err});
			}
			if(user){
				// console.log(user._bicycles);
				res.json({bikes:user._bicycles});
			}
			else{
				res.json({bikes:[]});
			}
		})
	},
	contact: function(req, res){
		User.findOne({_id:req.params.id},function(err,user){
			if(err){
				console.log(err);
			}
			else{
				res.json(user);
			}
		})
	}
}