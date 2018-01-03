var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
	first_name: {type:String, required:true},
	last_name: {type:String, required:true},
	email: {type:String, required: true, unique: true},
	password: {type:String, required:true},
	_bicycles: [{type:Schema.Types.ObjectId, ref:"Bicycle"}]
},{timestamps: true});
mongoose.model('User',UserSchema);