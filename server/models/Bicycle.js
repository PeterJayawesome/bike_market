var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BicycleSchema = mongoose.Schema({
	_user: {type: Schema.Types.ObjectId, ref:"User"},
	title: String,
	description: String,
	price: Number,
	location: String,
	image_url: String
},{timestamps: true});
mongoose.model('Bicycle',BicycleSchema);