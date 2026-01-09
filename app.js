const express = require("express");
const app = express(); // initialize app
const port = 3000;

const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test', 'root', 'root', {
 host: 'db',
 dialect: 'mysql'
});

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}
// GET callback function returns a response message


async function init() {

	await assertDatabaseConnectionOk();

	console.log(`Starting Sequelize + Express example on port ${port}...`);

	app.get("/", (req, res) => {
        res.send("Hello World! Welcome to Node.js");
    })
       
    app.listen(port, () => {
       console.log(`Server listening at http://localhost:${port}`);
    })
}

init();
