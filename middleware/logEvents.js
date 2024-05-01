//IMPORTS
//npm modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid"); //this lets me call version 4 by the name uuid

//node modules
const fs = require("node:fs");
const fsPromises = require("node:fs").promises;
const path = require("node:path");

// why don't we write this as function logEvents()
// we could accept another parameter
const logEvents = async (message, logName) => {
	const dateTime = `${format(new Date(), "yyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
	try {
		//if the path exists -- existsSync sees if the path exists
		if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.join(__dirname, "..", "logs")); //make a dir
		}
		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logName),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

// Custom Middleware
// we need next bc we're building this
const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
	console.log(`${req.method} ${req.path}`);
	next();
};

// export our logEvents fxn
module.exports = { logEvents, logger };
