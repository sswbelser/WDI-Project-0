// require express framework and additional modules
var express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

// tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));

// serve js and css files from public folder
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/view/index.html");
});

// listen on port 3000
app.listen(3000);