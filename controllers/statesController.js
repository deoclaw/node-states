const State = require("../model/State");

const data = {
	states: require("../model/states.json"),
	setStates: function (data) {
		this.states = data;
	}, //might not need setStates
};

const getAllStates = async (req, res) => {
	const states = await State.find();

	// loop through data.states and if data.states.code matches states.stateCode then
	data.states.forEach((state) => {
		//look in the states from the db to see if codes match - store in found
		states.forEach((DBState) => {
			//console.log(DBstate);
			if (DBState.stateCode === state.code) {
				state.funfacts = DBState.funfacts;
			}
		});
	});
	res.json(data.states); //just want all my states
};

const getContigStates = async (req, res) => {
	const states = await State.find();

	// loop through data.states and if data.states.code matches states.stateCode then
	data.states.forEach((state) => {
		//look in the states from the db to see if codes match - store in found
		states.forEach((DBState) => {
			//console.log(DBstate);
			if (DBState.stateCode === state.code) {
				state.funfacts = DBState.funfacts;
			}
		});
	});
	//if code is HI or AK then remove so we'll map over all but

	const contigStates = data.states
		.filter((state) => state.code !== "AK")
		.filter((state) => state.code !== "HI");
	console.log(contigStates.length);
	res.json(contigStates);
};

const getNonContigStates = async (req, res) => {
	const states = await State.find();

	// loop through data.states and if data.states.code matches states.stateCode then
	data.states.forEach((state) => {
		//look in the states from the db to see if codes match - store in found
		states.forEach((DBState) => {
			//console.log(DBstate);
			if (DBState.stateCode === state.code) {
				state.funfacts = DBState.funfacts;
			}
		});
	});
	//if code is HI or AK then remove so we'll map over all but
	const nonContig = data.states.filter(
		(state) => state.code === "AK" || state.code === "HI"
	);
	console.log(nonContig.length);
	res.json(nonContig);
};

const getState = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const states = await State.find();

	// loop through data.states and if data.states.code matches states.stateCode then
	data.states.forEach((state) => {
		//look in the states from the db to see if codes match - store in found
		states.forEach((DBState) => {
			//console.log(DBstate);
			if (DBState.stateCode === state.code) {
				state.funfacts = DBState.funfacts;
			}
		});
	});
	const singleState = data.states.filter((state) => state.code === req.code);
	res.json(singleState[0]);
};

const getStateCapital = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState);
	res.json({
		state: singleState[0].state,
		capital: singleState[0].capital_city,
	});
};

const getStateNickname = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState);
	res.json({
		state: singleState[0].state,
		nickname: singleState[0].nickname,
	});
};

const getStatePopulation = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState);
	res.json({
		state: singleState[0].state,
		population: singleState[0].population.toLocaleString(),
	});
};

const getStateAdmit = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState);
	res.json({
		state: singleState[0].state,
		admitted: singleState[0].admission_date,
	});
};

const getStateFunfact = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const states = await State.find();

	// loop through data.states and if data.states.code matches states.stateCode then
	data.states.forEach((state) => {
		//look in the states from the db to see if codes match - store in found
		states.forEach((DBState) => {
			//console.log(DBstate);
			if (DBState.stateCode === state.code) {
				state.funfacts = DBState.funfacts;
			}
		});
	});
	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState[0].funfacts);
	if (typeof singleState[0].funfacts !== "undefined") {
		index = Math.floor(Math.random() * singleState[0].funfacts.length);
		console.log(singleState[0].funfacts[index]);
		res.json({ funfact: singleState[0].funfacts[index] });
	} else if (typeof singleState[0].funfacts === "undefined") {
		res.json({ message: `No Fun Facts found for ${singleState[0].state}` });
	}
};

//body should contain funfacts property with array one or more
//if facts already exist, should add to not delete
//duplicates OK

const createStateFacts = async (req, res) => {
	if (!req?.body?.funfacts) {
		return res.json({ message: "State fun facts value required" });
	}
	if (!Array.isArray(req.body.funfacts)) {
		return res.json({ message: "State fun facts value must be an array" });
	}
	console.log(req.params.stateCode);
	const state = await State.findOne({
		stateCode: req.params.stateCode.toUpperCase(),
	}).exec();
	console.log(state);

	if (!state) {
		try {
			//create state in db and add
			const result = await State.create({
				stateCode: req.params.stateCode,
				funfacts: req.body.funfacts,
			});
			res.status(201).json(result);
		} catch (err) {
			console.error(err);
		}
	} else {
		state.funfacts.push(...req.body.funfacts);

		const result = await state.save(); //saves the changes made to the employee document

		res.json(result);
	}
};

const patchStateFacts = async (req, res) => {
	if (!req?.body?.funfact) {
		return res.json({ message: "State fun fact value required" });
	}
	if (typeof req.body.funfact != "string") {
		return res.json({ message: "State fun fact value required" });
	}
	if (!req?.body?.index) {
		return res
			.status(400)
			.json({ message: "State fun fact index value required" });
	}
	const index = req.body.index - 1;
	console.log(req.params.stateCode);
	const state = await State.findOne({
		stateCode: req.params.stateCode.toUpperCase(),
	}).exec();
	console.log(state);

	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState[0]);

	if (!state) {
		return res.json({
			message: `No Fun Facts found for ${singleState[0].state}`,
		});
	}

	if ((state && index >= state.funfacts.length) || index < 0) {
		return res.json({
			message: `No Fun Fact found at that index for ${singleState[0].state}`,
		});
	}

	state.funfacts[index] = req.body.funfact;

	const result = await state.save(); //saves the changes made to the employee document

	res.json(result);
};

const deleteStateFacts = async (req, res) => {
	if (!req?.body?.index) {
		return res
			.status(400)
			.json({ message: "State fun fact index value required" });
	}
	const index = req.body.index - 1;
	//console.log(req.params.stateCode);
	const state = await State.findOne({
		stateCode: req.params.stateCode.toUpperCase(),
	}).exec();
	//console.log(state);

	const singleState = data.states.filter((state) => state.code === req.code);
	console.log(singleState[0]);

	if (!state) {
		return res.json({
			message: `No Fun Facts found for ${singleState[0].state}`,
		});
	}

	if ((state && index >= state.funfacts.length) || index < 0) {
		return res.json({
			message: `No Fun Fact found at that index for ${singleState[0].state}`,
		});
	}

	const reducedFacts = state.funfacts.splice(index, 1);

	const result = await state.save(); //saves the changes made to the employee document

	res.json(result);
};

module.exports = {
	getAllStates,
	getContigStates,
	getNonContigStates,
	getState,
	getStateCapital,
	getStateNickname,
	getStatePopulation,
	getStateAdmit,
	getStateFunfact,
	createStateFacts,
	patchStateFacts,
	deleteStateFacts,
};
