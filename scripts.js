// THIS WORKS WHEN SAVING TO LOCAL STORAGE, but not submit button
var Post = function(image, title, body, ratings, comments) {
	this.image = image;
	this.title = title;
	this.body = body;
	this.ratings = ratings;
	this.comments = comments;

	this.posts = localStorage.getItem("posts");
	this.key = "posts";
}

function SaveRender() {}

SaveRender.prototype.saveToLs = function(obj) {
	if (this.posts) {
		posts_json = JSON.parse(this.posts);
	}
	else {
		posts_json = [];
	}
	posts_json.push(obj);
	localStorage.setItem(this.key, JSON.stringify(posts_json));
}

SaveRender.prototype.renderTemplate = function(x, y) {
	var posts_json = JSON.parse(this.posts);
	var template = _.template($(x).html());
	_.each(posts_json, function(item) {
		$(y).append(template(item));
	});
}

Post.prototype = new SaveRender();
Post.prototype.constructor = Post;

var newPost = new Post ("http://images.akamai.steamusercontent.com/ugc/882976651020486774/F265CB501950E8EE518F253483B756C29F4C1004/", "Shovel Knight", "jnoaskdnbewvbsidvn asodnfaosdnf asdnoasdn asodnvasjdnwef onsadof, asidjfnasidjf. asdfj.", 8.5, "asdlk. AW lkasjd.")
newPost.saveToLs(newPost);

newPost.renderTemplate("#post-template", "#post-container");

// $(function() {
// var $newPost = $("#new-post");
// // var $newComment = $("#new-comment");
// var $postList = $("#post-list");
// var postTemplate = _.template($("post-template").html());

// var Post = function(image, title, body) {
// 	this.image = image;
// 	this.title = title;
// 	this.body = body;
// 	// this.ratings = ratings;
// 	// this.comments = comments;

// 	// this.posts = localStorage.getItem("posts");
// 	// this.key = "posts";
// }
// Post.all = [];

// Post.prototype.save = function(postImage, postTitle, postBody) {
// 	Post.all.push(this);
// }

// Post.prototype.render = function(postImage, postTitle, postBody) {
// 	var index = Post.all.indexOf(this);
// 	var $post = $(postTemplate(this));
// 	$post.attr("data-index", index);
// 	$postList.append($post);
// }

// $newPost.on("submit", function() {
// 	event.preventDefault();
// 	var postImage = $("#new-image").val();
// 	var postTitle = $("#new-title").val();
// 	var postBody = $("#new-body").val();
// 	// var postRating = $("#rating").val();
// 	// var postComment = $("#comment").val();
// 	var newPost = new Post(postImage, postTitle, postBody);

// 	newPost.save();
// 	newPost.render();

// 	console.log(Post.all);

// 	// $newPost[0].reset();
// });

// });

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