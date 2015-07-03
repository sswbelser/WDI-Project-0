$(function() {
var $newPost = $("#modal-form");
// var $newComment = $("#new-comment");
var $postList = $("#post-list");
var postTemplate = _.template($("#post-template").html());

var Post = function(image, title, body) {
	this.image = image;
	this.title = title;
	this.body = body;
	// this.ratings = ratings;
	// this.comments = comments;

	// this.posts = localStorage.getItem("posts");
	// this.key = "posts";
}
Post.all = [];

Post.prototype.save = function() {
	Post.all.push(this);
}

Post.prototype.render = function() {
	var index = Post.all.indexOf(this);
	var $post = $(postTemplate(this));
	$post.attr("data-index", index);
	$postList.append($post);
}

$newPost.on("submit", function() {
	event.preventDefault();
	var postImage = $("#new-image").val();
	var postTitle = $("#new-title").val();
	var postBody = $("#new-body").val();
	// var postRating = $("#rating").val();
	// var postComment = $("#comment").val();
	var newPost = new Post(postImage, postTitle, postBody);

	newPost.save();
	newPost.render();

	console.log(Post.all);

	// $newPost[0].reset();
});

});

// $newComment.on("submit", function() {
// 	event.preventDefault();
// 	var commentRating = $("#rating").val();
// 	var commentComment = $("#comment").val();
// 	var newComment = new Post(commentRatings, commentComments);

// 	newComment.save();
// 	newComment.render();

// 	console.log(Post.all);

// 	$newPost[0].reset();
// });