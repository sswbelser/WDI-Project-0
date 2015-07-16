// CLIENT-SIDE JAVASCRIPT

$(function() {

	var totalPosts = 4;
	$('#counter').html(totalPosts + ' total posts');

	// `postsController` holds all our post funtionality
	var postsController = {
    
		// compile post template
		template: _.template($('#post-template').html()),

		all: function() {
			$.get('/api/posts', function(data) {
				var allPosts = data;
				// iterate through allPosts
				_.each(allPosts, function(post) {
					// pass each post object through template and append to view
					var $postHtml = $(postsController.template(post));
					$('#post-list').append($postHtml);
				});
				// add event-handlers to posts for updating/deleting
				postsController.addEventHandlers();
			});
		},

		create: function(newImage, newTitle, newBody) {
			var postData = {image: newImage, title: newTitle, body: newBody};
			// send POST request to server to create new post
			$.post('/api/posts', postData, function(data) {
				// pass post object through template and append to view
				var $postHtml = $(postsController.template(data));
				$('#post-list').append($postHtml);
				totalPosts++;
				$('#counter').html(totalPosts + ' total posts');
			});
		},

		update: function(postId, updatedImage, updatedTitle, updatedBody) {
			// send PUT request to server to update post
			$.ajax({
				type: 'PUT',
				url: '/api/posts/' + postId,
				data: {
					image: updatedImage,
					title: updatedTitle,
					body: updatedBody
				},
				success: function(data) {
					// pass post object through template and append to view
					var $postHtml = $(postsController.template(data));
					$('#post-' + postId).replaceWith($postHtml);
				}
			});
		},
    
		delete: function(postId) {
			// send DELETE request to server to delete post
			$.ajax({
				type: 'DELETE',
				url: '/api/posts/' + postId,
				success: function(data) {
					// remove deleted post li from the view
					$('#post-' + postId).remove();
					totalPosts--;
					$('#counter').html(totalPosts + ' total posts');
				}
			});
		},

		// add event-handlers to posts for updating/deleting
		addEventHandlers: function() {
			$('#post-list')
			// for update: submit event on `.update-post` form
			.on('submit', '.update-post', function(event) {
				event.preventDefault();
				var postId = $(this).closest('.post').attr('data-id');
				var updatedImage = $(this).find('.updated-image').val();
				var updatedTitle = $(this).find('.updated-title').val();
				var updatedBody = $(this).find('.updated-body').val();
				postsController.update(postId, updatedImage, updatedTitle, updatedBody);
			})
			// for delete: click event on `.delete-post` button
			.on('click', '.delete-post', function(event) {
				event.preventDefault();
				var postId = $(this).closest('.post').attr('data-id');
				postsController.delete(postId);
			});
		},

		setupView: function() {
			// append existing posts to view
			postsController.all();
			// add event-handler to new-post form
			$('#new-post').on('submit', function(event) {
				event.preventDefault();
				var newImage = $('#new-image').val();
				var newTitle = $('#new-title').val();
				var newBody = $('#new-body').val();
				postsController.create(newImage, newTitle, newBody);
				// reset the form
				$(this)[0].reset();
			});
		}
	};

	postsController.setupView();

});


// $(function() {
// 	// Variables declared and fixed to various IDs
// 	var $newPost = $("#modal-form");
// 	var $newComment = $("#comment-modal-form");
// 	var $postList = $("#post-list");
// 	var $commentList = $("#comment-list");
// 	var postTemplate = _.template($("#post-template").html());
// 	var commentTemplate = _.template($("#comment-template").html());

// 	var totalPosts = 0

// 	var Post = function(image, title, body) {
// 		this.image = image;
// 		this.title = title;
// 		this.body = body;

// 		// this.posts = localStorage.getItem("posts");
// 		// this.key = "posts";
// 	}

// 	var Comment = function(rating, comment) {
// 		this.rating = rating;
// 		this.comment = comment;
// 	}

// 	Post.all = [];

// 	Comment.all = [];

// 	Post.prototype.save = function() {
// 		Post.all.push(this);
// 	}

// 	Comment.prototype.save = function() {
// 		Comment.all.push(this);
// 	}

// 	Post.prototype.render = function() {
// 		var postIndex = Post.all.indexOf(this);
// 		var $post = $(postTemplate(this));
// 		$post.attr("data-index", postIndex);
// 		$postList.append($post);

// 	}

// 	Comment.prototype.render = function() {
// 		var commentIndex = Comment.all.indexOf(this);
// 		var $comment = $(commentTemplate(this));
// 		$comment.attr("data-index", commentIndex);
// 		$commentList.append($comment);
// 	}

// 	$newPost.on("submit", function() {
// 		event.preventDefault();
// 		var postImage = $("#new-image").val();
// 		var postTitle = $("#new-title").val();
// 		var postBody = $("#new-body").val();
// 		var newPost = new Post(postImage, postTitle, postBody);

// 		totalPosts++;
// 		$("#counter").html(totalPosts + " total posts");

// 		newPost.save();
// 		newPost.render();

// 		console.log(Post.all);

// 		$newPost[0].reset();
// 	});

// 	$newComment.on("submit", function () {
// 		event.preventDefault();
// 		var commentRating = $("#new-rating").val();
// 		var commentComment = $("#new-comment").val();
// 		var newComment = new Comment(commentRating, commentComment);

// 		newComment.save();
// 		newComment.render();

// 		console.log(Comment.all);

// 		$newComment[0].reset();
// 	});

// });