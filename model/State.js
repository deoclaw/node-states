const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating data types
const stateSchema = new Schema({
	//we don't need an id bc one will be made for us
	stateCode: {
		type: String,
		require: true,
		unique: true,
	},
	funfacts: {
		type: Array,
		default: [], //do i need this?
	},
});

module.exports = mongoose.model("State", stateSchema);
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
// in my CompanyDB I have a collection 'employees'
