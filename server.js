// Note that our routes and all will waterfall down...
//	----------------------------------------------------------------------			IMPORTS			---------------------------------------------------------------------------------
require("dotenv").config();
const express = require("express"); //import express
const app = express(); //instantiate express
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents"); //curly braces bc there's multiple fxns being exported
const errorHandler = require("./middleware/errorHandler");
// lets us work with mongo
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500; //either environment var or port 3500

//connect to MongoDB
connectDB();

// our use and get are all waterfalling -- this will fall down and apply to all
//  --------------------------------------------------------------------------			MIDDLEWARE			----------------------------------------------------------------------------

// Custom Middleware
// Logger - written in logEvents
app.use(logger);
//app.use(verifyStates);
//THIRD PARTY MIDDLEWARE
//		----------------------------------------------------------			Cross Origin Resource Sharing			------------------------------------------------------------------

app.use(cors(corsOptions));
//		-------------------------------------------------------------------------		END CORS		---------------------------------------------------------------------

//	BUILT IN MIDDLEWARE
// built in middleware to handle URLencoded data (form data)
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));
//built in middleware for json
app.use(express.json());

//		------------------------------------------------------------		STATIC FILE HANDLING		------------------------------------------------------------------
//built in middleware for static files -- lets us use css, img, etc -- this is like what Astro uses -- a public dir
// note: / is the default -- we don't need to put it -- but putting it so we can see it vs subdir --> we need to tell express where to go
app.use("/", express.static(path.join(__dirname, "/public")));

//---------------------------------------------------------------------------------		ROUTES		----------------------------------------------------------------------
app.use("/", require("./routes/root"));
app.use("/states", require("./routes/api/states"));

//	---------------------------------------------------------------------------		404		--------------------------------------------------------------------------------------------
//handle 404s - if all above isn't met then default to 404 page
// WILL USE APP.ALL() -- app.use can now use regex but tends to be used for middleware --> app.all does routing
//app.all(*) says anything that made it here should get a 404
app.all("*", (req, res) => {
	//chained status code so we tell the server 'hey, this is a 404!' because we do have a 404 page so it will give a 202 -- we need to tell it 'no! 404!'
	res.status(404);
	//check content type
	if (req.accepts("html")) {
		//if we're trying to access an html page then...
		res.sendFile(path.join(__dirname, "views", "404.html"));
	} else if (req.accepts("json")) {
		//if we're trying to access an html page then...
		res.json({ error: "404 not found" });
	} else {
		res.type("txt").send("404 not found");
	}
});

//note: we can chain routes with (req, res, next) and call next to go to the next handler OR we make constants with this and then pass an array of the routes -- see middleware

//error handling - custom logs
app.use(errorHandler);
//
//		--------------------------------------------------------		SERVER LISTENING -----------------------------------------------------------------
// last line - have our server listen
// wrapped this in a call to mongoose so we listen to requests only if commected
mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
