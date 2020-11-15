// ENVIRONMENT VARIABLES
if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === "prod") {
	require("dotenv").config({ path: "./environments/environment.prod.env" })
} else {
	require("dotenv").config({ path: "./environments/environment.env" })
}