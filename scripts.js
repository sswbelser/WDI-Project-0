$(function() {
	// Variables declared and fixed to various IDs
	var $newPost = $("#modal-form");
	var $newComment = $("#comment-modal-form");
	var $postList = $("#post-list");
	var $commentList = $("#comment-list");
	var postTemplate = _.template($("#post-template").html());
	var commentTemplate = _.template($("#comment-template").html());

	var totalPosts = 0

	var Post = function(image, title, body) {
		this.image = image;
		this.title = title;
		this.body = body;

		// this.posts = localStorage.getItem("posts");
		// this.key = "posts";
	}

	var Comment = function(rating, comment) {
		this.rating = rating;
		this.comment = comment;
	}

	Post.all = [];

	Comment.all = [];

	Post.prototype.save = function() {
		Post.all.push(this);
	}

	Comment.prototype.save = function() {
		Comment.all.push(this);
	}

	Post.prototype.render = function() {
		var postIndex = Post.all.indexOf(this);
		var $post = $(postTemplate(this));
		$post.attr("data-index", postIndex);
		$postList.append($post);

	}

	Comment.prototype.render = function() {
		var commentIndex = Comment.all.indexOf(this);
		var $comment = $(commentTemplate(this));
		$comment.attr("data-index", commentIndex);
		$commentList.append($comment);
	}

	$newPost.on("submit", function() {
		event.preventDefault();
		var postImage = $("#new-image").val();
		var postTitle = $("#new-title").val();
		var postBody = $("#new-body").val();
		var newPost = new Post(postImage, postTitle, postBody);

		totalPosts++;
		$("#counter").html(totalPosts + " total posts");

		newPost.save();
		newPost.render();

		console.log(Post.all);

		$newPost[0].reset();
	});

	$newComment.on("submit", function () {
		event.preventDefault();
		var commentRating = $("#new-rating").val();
		var commentComment = $("#new-comment").val();
		var newComment = new Comment(commentRating, commentComment);

		newComment.save();
		newComment.render();

		console.log(Comment.all);

		$newComment[0].reset();
	});

});