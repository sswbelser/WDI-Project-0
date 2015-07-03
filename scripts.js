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