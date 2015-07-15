// SERVER NODE.JS

// require express framework and additional modules
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	_ = require("underscore"),
	mongoose = require("mongoose"),
	db = require("./models/post");

// var posts = require("./models/post");
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
	Post.find(function (err, allposts) {
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
	Post.fineOne({_id: targetId}, function (err, foundPost) {
		console.log(foundPost);
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
	var newPost = new Post({
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
	var targetId = req.params._id;
	Post.findOne({_id: targetId}, function (err, foundPost) {
		console.log(foundPost);
		if (err) {
			console.log("Error: " + err)
			res.status(500).send(err);
		} else {
			res.json(foundPost);
		}
	})
});

app.delete("/api/posts/:id", function (req, res) {
	var targetId = req.params._id;
	Post.findOneAndRemove({_id: targetId}, function (err, deletedPost) {
		if (err) {
			console.log("Error: ",  + err);
			res.status(500).send(err);
		} else {
			res.json(deletedPost);
		}
	});
});

// listen on port 3000
app.listen(3000, function() {
	console.log("I'm ALIIIIIIVE!!!!!!!!");
});
