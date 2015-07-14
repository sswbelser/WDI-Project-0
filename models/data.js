// Data.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
	image: String,
	title: String,
	body: String
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;