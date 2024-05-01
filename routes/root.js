const express = require("express");
const router = express.Router(); //lets us  route
const path = require("path");

// we can use regex in the routing with express -> ^=starts with, $=end with, ()?=optional

router.get("^/$|/index(.html)?", (req, res) => {
	//what we do with the route
	//we can say 'look here and also here's the root which is our dir to server.js
	// res.sendFile("./views/index.html", { root: __dirname });
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
