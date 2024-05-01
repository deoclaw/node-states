// app.use(cors()) = completely open. great for an api.
// don't want it all open? let's use a whitelist -- you'd add YOUR DOMAIN from which your web app that would access the backend server and any variants (e.g. www subdomain)
//	NOTE: also want to add your localhosts

const whitelist = ["http://localhost:3500/", "http://127.0.0.1:3500"];
// we create an options object
const corsOptions = {
	origin: (origin, callback) => {
		//if the domain is in the whiltelist then let it pass
		// we have this OR no origin exists to handle our dev server -- remove for production
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			//first param is error -- no error, null! then true
			callback(null, true);
		} else {
			callback(new Error("not allowed by cors"));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
