// CLIENT-SIDE JS
$(function() {

	var postsController = {

		template: _.template($("post-template").html()),

		all: function() {
			$.get("/api/posts", function(data) {
				var allPosts = data;
				_.each(allPosts, function(post) {
					var $postHtml = $(postsController.template(post));
					$("#post-list").prepend($postHtml);
				});
				postsController.addEventHandlers();
			});
		},

		create: function(newImage, newTitle, newBody) {
			var postData = {image: newImage, title: newTitle, body: newBody};
			$.post("/api/posts", postData, function(data) {
				var $postHtml = $(postsController.template(data));
				$("#post-list").prepend($postHtml);
			});
		},

		update: function(postId, updatedImage, updatedTitle, updatedBody) {
			$.ajax({
				type: "PUT",
				url: "/api/posts/" + postId,
				data: {
					image: updatedImage,
					title: updatedTitle,
					body: updatedBody
				},
				success: function(data) {
					var $postHtml = $(postsController.template(data));
					$("#post-"+postId).replaceWith($postHtml);
				}
			});
		},

		delete: function(postId) {
			$.ajax({
				type: "DELETE",
				url: "/api/posts/" + postId,
				success: function(data) {
					$("#post-"+postId).remove();
				}
			});
		},

		// addEventHandlers: function() {
		// 	$("post-list")
		// 	.on("submit", ".update-post", function(event) {
		// 		event.preventDefault();
		// 		var postId = $(this).closest(".post").attr("data-id");
		// 		var updatedImage = $(this).find(".updated-image").val();
		// 		var updatedTitle = $(this).find(".updated-title").val();
		// 		var updatedBody = $(this).find(".updated-body").val();
		// 		postsController.update(postId, updatedImage, updatedTitle, updatedBody);
		// 	})
		// },

		setupView: function() {
			postsController.all();
			$("#modal-form").on("submit", function(event) {
				event.preventDefault();
				var $newImage = $("new-image").val();
				var $newTitle = $("new-title").val();
				var $newBody = $("new-body").val();
				postsController.create(newImage, newTitle, newBody);

				$(this)[0].reset();
			});
		}

	};

	postsController.setupView();

});



	// // Variables declared and fixed to various IDs
	// var $newPost = $("#modal-form");
	// var $newComment = $("#comment-modal-form");
	// var $postList = $("#post-list");
	// var $commentList = $("#comment-list");
	// var postTemplate = _.template($("#post-template").html());
	// var commentTemplate = _.template($("#comment-template").html());

	// var totalPosts = 0

	// var Post = function(image, title, body) {
	// 	this.image = image;
	// 	this.title = title;
	// 	this.body = body;
	// }

	// var Comment = function(rating, comment) {
	// 	this.rating = rating;
	// 	this.comment = comment;
	// }

	// Post.all = [];

	// Comment.all = [];


	// setupView: function() {
	// 	//sppend existing status to view
	// 	postController.all();

	// 	//add event-handler to new-status modal
	// 	$newPost.on('submit', function(event) {
	// 		event.preventDefault();

	// 		//create new status with form data
	// 		var postImage = $("#new-image").val();
	// 		var postTitle = $("#new-title").val();
	// 		var postBody = $("#new-body").val();
	// 		statusController.create(postImage, postTitle, postBody);

	// 		// reset the form
	// 		$(this)[0].reset();
	// 		// $newPost.focus();
	// 	});
	// }


	// Post.prototype.save = function() {
	// 	Post.all.push(this);
	// }

	// Comment.prototype.save = function() {
	// 	Comment.all.push(this);
	// }

	// // Post.prototype.render = function() {
	// // 	var postIndex = Post.all.indexOf(this);
	// // 	var $post = $(postTemplate(this));
	// // 	$post.attr("data-index", postIndex);
	// // 	$postList.append($post);
	// // }

	// Post.prototype.render = function(postData) {
	// 	var $postHtml = $(postController.template(postData));
	// 	$postList.append($postHtml);
	// }

	// Comment.prototype.render = function() {
	// 	var commentIndex = Comment.all.indexOf(this);
	// 	var $comment = $(commentTemplate(this));
	// 	$comment.attr("data-index", commentIndex);
	// 	$commentList.append($comment);
	// }

	// $.get(
	// 	"/api/posts",
	// 	function(data) {
	// 		for(var i=0; i < 20; i++) {
	// 			var posts = data.sampleData[i];
	// 			var addPosts = new Post(posts.image, posts.title, posts.body);
	// 			addPosts.save();
	// 			addPosts.render();
	// 		};
	// 	});

	// $newPost.on("submit", function() {
	// 	event.preventDefault();
	// 	var postImage = $("#new-image").val();
	// 	var postTitle = $("#new-title").val();
	// 	var postBody = $("#new-body").val();
	// 	var newPost = new Post(postImage, postTitle, postBody);

	// 	totalPosts++;
	// 	$("#counter").html(totalPosts + " total posts");

	// 	newPost.save();
	// 	newPost.render();

	// 	console.log(Post.all);

	// 	$newPost[0].reset();
	// });

	// $newComment.on("submit", function () {
	// 	event.preventDefault();
	// 	var commentRating = $("#new-rating").val();
	// 	var commentComment = $("#new-comment").val();
	// 	var newComment = new Comment(commentRating, commentComment);

	// 	newComment.save();
	// 	newComment.render();

	// 	console.log(Comment.all);

	// 	$newComment[0].reset();
	// });