// this will spin up express, which will make it easier to handle requests

import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import morgan from "morgan";
import parser from "body-parser";

import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";
import userRoutes from "./api/routes/users.js";

const logData = [];
const stream = {
	write: (data) => {
		logData.push(data);
		console.log("Success", logData);
	},
};
app.use(morgan("tiny", { stream }));

// app.use(parser.json());
// app.use(parser.urlencoded({ extended: false })); // false because it will only parse simple body and not complex-rich body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
// 	// allow request from any origin
// 	res.header("Access-Control-Allow-Orgin", " *");

// 	// allow specific headers in requests
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");

// 	if (req.method === "OPTION") {
// 		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, UPDATE");
// 		return res.status(200).json({});
// 	}
// 	next();
// });

// app.use(function (req, res, next) {
// 	// res.header("Access-Control-Allow-Origin", "*");
// 	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Credentials", "true");
// 	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
// 	);
// 	next();
// });

// a middleware, to which our request will come. it has to go through this

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
	console.log(req.headers);
	const error = new Error("Path not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res?.status(error.status || 500);
	res.json({
		message: error.message,
	});
});

export default app;
