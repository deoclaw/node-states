const express = require("express");
const router = express.Router(); //lets us  route
const path = require("path");
const stateController = require("../../controllers/statesController"); //logic separated to controller
const verifyStates = require("../../middleware/verifyStates");

// rather than create router.get, router.post, etc... we can router.route and chain the http methods we want to provide
// THESE ALSO NEED A CALL TO MONGODB -------------------------------
router.route("/").get(stateController.getAllStates);

//contig true
router.route("/?contig=true").get(stateController.getContigStates);

//contig false
router.route("/?contig=false").get(stateController.getNonContigStates);

// ------------------- THESE ARE GOOD??? -------------------------------
router.use("/:stateCode", verifyStates); // I NEEDED THIS FUCKING SHIT?~
//get single state
router.route("/:stateCode").get(stateController.getState, verifyStates);
//get single state with fun fact
router.route("/:stateCode/funfact").get(stateController.getStateFunfact);
//get single state capital
router.route("/:stateCode/capital").get(stateController.getStateCapital);
//get single state nickname
router.route("/:stateCode/nickname").get(stateController.getStateNickname);
//get single state population
router.route("/:stateCode/population").get(stateController.getStatePopulation);
//get single state admissionDate
router.route("/:stateCode/admission").get(stateController.getStateAdmit);
//-------------------------END SIMPLE GETS---------------------------------

//post, patch, delete - states/:stateCode/funfact
router
	.route("/:stateCode/funfact")
	.post(stateController.createStateFacts)
	.patch(stateController.patchStateFacts)
	.delete(stateController.deleteStateFacts);
//404

module.exports = router;
