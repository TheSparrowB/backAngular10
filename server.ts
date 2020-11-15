import "./config/environment";
import { logger } from "./utils/log";
//import serviceDatabase = require('./services/database');

// INITIALIZE APP
import app = require("./bin/app");

const startup = async () => {
	logger.info("Starting application");

	try {
		//logger.info('Initializing database module');
		//await serviceDatabase.initialize();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}	

	try {
		logger.info('Initializing web server module');
		await app.initialize();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

startup();

const shutdown = async (e = null) => {
	let err = e;

	logger.info('Shutting down');

	try {
		logger.info('Closing web server module');
		await app.close();
	} catch (e) {
		logger.error(`Encountered error: ${e}`);
		err = err || e;
	}

	logger.info('Exiting process');

	if (err) {
		process.exit(1);
	} else {
		process.exit(0);
	}
}

process.on('SIGTERM', () => {
	logger.info('Received SIGTERM');
	shutdown();
});

process.on('SIGINT', () => {
	logger.info('Received SIGINT');
	shutdown();
});

process.on('uncaughtException', err => {
	logger.info('Uncaught exception');
	logger.error(err);
	shutdown(err);
});


if (process.env.NODE_ENV && process.env.NODE_ENV === 'prod') {
    logger.info("Iniciado en ambiente de producción.");
}
