import configGeneral = require("../config/general");
import morgan = require("morgan");

const rfs = require('rotating-file-stream');

const pathDirectoryLog = configGeneral.pathDirectoryLog;
const accessLogStream = rfs("access.log", {
	size: "5M",
	interval: "1d",
	compress: "gzip",
	path: pathDirectoryLog
});

const middlewares = app => {
	app.use(morgan('dev', {
		skip: function (req, res) { return res.statusCode < 400 }
	  }));
	app.use(morgan('combined', { stream: accessLogStream }));
};

export { middlewares }