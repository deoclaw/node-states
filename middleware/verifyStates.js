const data = {
	states: require("../model/states.json"),
	setStates: function (data) {
		this.states = data;
	}, //might not need setStates
};

const verifyStates = (req, res, next) => {
	const { stateCode } = req.params;

	const stateAbbr = data.states.map((state) => state.code);
	//find returns value or undefined
	const found = stateAbbr.find((code) => code === stateCode.toUpperCase());

	if (found) {
		req.code = found;
		next();
	} else {
		res.status(404).json({ message: "Invalid state abbreviation parameter" });
	}
};

module.exports = verifyStates;
