const chalk = require("chalk");
const Aplication = require("./models/Aplications");

async function addAplication(username, phonenumber, message) {
	await Aplication.create({ username, phonenumber, message });

	console.log(chalk.bgGreen("Aplication was added!"));
}

async function removeAplication(idForRemove) {
	const result = await Aplication.deleteOne({ _id: idForRemove });

	if (result.matchedCount === 0) {
		throw new Error("No Aplication to delete");
	}

	console.log(
		chalk.red(`Aplication with id="${idForRemove}" has been removed.`)
	);
}

async function getAplications() {
	const aplications = await Aplication.find();

	return aplications;
}

module.exports = {
	addAplication,
	removeAplication,
	getAplications,
};
