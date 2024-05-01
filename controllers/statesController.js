const State = require("../model/State");

const data = {
	states: require("../model/states.json"),
	setStates: function (data) {
		this.states = data;
	}, //might not need setStates
};

const getAllStates = (req, res) => {
	res.json(data.states); //just want all my states
};

const getContigStates = (req, res) => {
	//if code is HI or AK then remove so we'll map over all but

	const contigStates = data.states
		.filter((state) => state.code !== "AK")
		.filter((state) => state.code !== "HI");
	res.json(contigStates);
};

const getNonContigStates = (req, res) => {
	//if code is HI or AK then remove so we'll map over all but
	const nonContig = data.states.filter(
		(state) => state.code === "AK" || state.code === "HI"
	);
	res.json(nonContig);
};

const getState = async (req, res) => {
	if (!req.params?.stateCode) {
		return res
			.status(400)
			.json({ message: "Invalid state abbreviation parameter" });
	} //why params? bc searching
	const singleState = data.states.filter((state) => state.code === req.code);
	res.json(singleState);
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
		population: singleState[0].population,
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

const createNewStateFact = async (req, res) => {
	//req.body.parameter_name -- this is how we can get the parameter data
	if (!req?.body?.funfact) {
		//if we don't have a req with a body with a fn or ln...
		return res
			.status(400)
			.json({ message: "first and lastnames are required" });
	}
	try {
		const result = await Employee.create({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
		});
		//201 = created
		res.status(201).json(result);
	} catch (err) {
		console.error(err);
	}
};

const updateEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: "id required" });
	}
	const employee = await Employee.findOne({ _id: req.body.id }).exec();
	//
	//if our employee doesn't exist it means we got crap data
	if (!employee) {
		return res
			.status(204)
			.json({ message: `No employee matches ID ${req.body.id}` });
	}
	// if we got a firstname, set it
	if (req.body?.firstname) employee.firstname = req.body.firstname;
	// if we got a lastname, set it
	if (req.body?.lastname) employee.lastname = req.body.lastname;
	//filter the array and remove the existing employee id

	const result = await employee.save(); //saves the changes made to the employee document

	res.json(result);
};

const deleteEmployee = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(400).json({ message: "id required" });
	}
	const employee = await Employee.findOne({ _id: req.body.id }).exec();
	//find our employee and if it doesn't exist, return//find our employee and if it doesn't exist, return
	if (!employee) {
		return res
			.status(204)
			.json({ message: `No employee matches ID ${req.body.id}` });
	}
	const result = await employee.deleteOne({ _id: req.body.id });
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
};
