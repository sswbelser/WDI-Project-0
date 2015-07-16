// SERVER NODE.JS

// require express framework and additional modules
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	_ = require("underscore"),
	mongoose = require("mongoose"),
	session = require("express-session"),
	db = require("./models/post");

var Post = require("./models/post")
mongoose.connect("mongodb://localhost/test");

// serve js and css files from public folder
app.use(express.static(__dirname + "/public"));

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// show HTML file on main page
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/view/index.html");
});

app.get("/api/posts", function (req, res) {
	db.Post.find(function (err, allposts) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).send(err);
		} else {
			res.json(allposts);
		}
	});
});

app.get("/api/posts/:id", function (req, res) {
	var targetId = req.params._id;
	db.Post.fineOne({_id: targetId}, function (err, foundPost) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).send(err);
		} else {
			res.json(foundPost);
		}
	})
	res.json(foundPost);
});

app.post("/api/posts", function (req, res) {
	var newPost = new db.Post({
		image: req.body.image,
		title: req.body.title,
		body: req.body.body
	});
	newPost.save(function (err, savedPost) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).send(err);
		} else {
			res.json(savedPost);
		}
	})

});

app.put("/api/posts/:id", function (req, res) {
	var targetId = req.params.id;
	db.Post.findOne({_id: targetId}, function (err, foundPost) {
		if (err) {
			console.log("Error: " + err);
			res.status(500).send(err);
		} else {
			foundPost.image = req.body.image;
			foundPost.title = req.body.title;
			foundPost.body = req.body.body;
			foundPost.save(function (err, savedPost) {
				if (err) {
					console.log("Error: " + err);
					res.status(500).send(err);
				} else {
					res.json(savedPost);
				}
			})
		}
	})
});

app.delete("/api/posts/:id", function (req, res) {
	var targetId = req.params.id;
	db.Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
		if (err) {
			console.log("Error: ",  + err);
			res.status(500).send(err);
		} else {
			res.json(deletedPost);
		}
	});
});

app.get("/api/posts/:postid/comments", function (req, res) {
	db.Post.findOne({_id: req.params.postid}, function (err, post) {
		res.json(post.comments);
	});
});

app.post("/api/posts/:postid/comments", function (req, res) {
	db.Post.findOne({_id: req.params.postid}, function (err, post) {
		var newComment = new db.Comment({text: req.body.text});
		post.comments.push(newComment);
		res.json(newComment);
	})
})

// listen on port 3000
app.listen(3000);