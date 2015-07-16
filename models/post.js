// post.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	image: String,
	title: String,
	body: String
});
var CommentSchema = new Schema({
	text: String,
	rating: Number,
	timestamp: {
		type: Date,
		default: Date.now
	}
});

var Post = mongoose.model("Post", PostSchema, "allposts"),
	Comment = mongoose.model("Comment", CommentSchema);

module.exports.Post = Post;
module.exports.Comment = Comment;