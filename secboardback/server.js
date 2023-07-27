const express = require("express");
const app = express();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { generateToken } = require("./auth");

// const axios = require('axios')
const fs = require("fs");

const https = require("https");
const request = require("request");
const http = require("http");
const url = require("url");
// const path = require('path')
const cors = require("cors");
const { error } = require("console");

//const privateKey = fs.readFileSync("./privkey1.pem", "utf8");
//const certificate = fs.readFileSync("./fullchain1.pem", "utf8");
//const credentials = { key: privateKey, cert: certificate };
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

//httpsServer.listen(3210, () => {
//	console.log("3210 Ports running");
//});
httpServer.listen(3210, () => {
	console.log("3211 Ports running");
});

//app.use(
//	cors({
//		origin: "https://secboard.321squad.com", // 前端服务器地址
//	})
//);

 app.use(
 	cors({
 		origin: "http://localhost:8080/", // 前端服务器地址
 	})
 );

// app.listen(3210, () => {
// 	console.log("3210 port running");
// });

app.use(express.json());

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
// 	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
// 	res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
// 	res.header("Content-Type", "application/json;charset=utf-8");
// 	next();
// });

// app.use('/chunk', express.static(path.join(__dirname, 'chunk')))
// app.use(cors());

const mySqlConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "12345",
	port: "3306",
	database: "321db",
	charset: "utf8mb4",
});


// const mySqlConnection = mysql.createConnection({
// 	host: "103.43.75.136",
// 	user: "secboard",
// 	password: "secboardmysql",
// 	port: "3306",
// 	database: "321DB",
// 	charset: "utf8mb4",
// });




setInterval(() => {
	const preventErro = "select * from users_info";
	mySqlConnection.query(preventErro);
}, 3600000);

app.get("/", (req, res) => {
	res.send("3210 Ports Success!");
});

app.post("/api/login", (req, res) => {
	const authLoginSQL = "select * from users_info where email=?";
	const authLoginParams = [req.body.email];
	mySqlConnection.query(authLoginSQL, authLoginParams, async (error, result) => {
		if (result.length !== 0) {
			const userPassword = await JSON.parse(JSON.stringify(result))[0].password;
			const userPasswordCompare = await bcrypt.compare(req.body.password, userPassword);
			if (userPasswordCompare) {
				const userToken = generateToken({ email: req.body.email });

				res.send({
					status: 200,
					name: JSON.parse(JSON.stringify(result))[0].name,
					token: userToken,
					message: "Welcome!",
				});
			} else {
				res.send({
					status: 401,
					message: "Email or Password wrong",
				});
			}
		} else {
			res.send({
				status: 401,
				message: "Email or Password wrong",
			});
		}
	});
});

app.post("/api/register", async (req, res) => {
	const saltC = 10;
	let salt = await bcrypt.genSalt(saltC);
	let bcPasword = await bcrypt.hash(req.body.password, salt);
	const createUserSQL = "insert into users_info values(?,?,?)";
	const createUserParams = [req.body.email, req.body.name, bcPasword];
	mySqlConnection.query(createUserSQL, createUserParams, (error, result) => {
		if (error) {
			return new Error(error);
		} else {
			res.send({
				status: 200,
				message: "Successfully created account!",
			});
		}
	});
});

app.post("/api/getPosts", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		const getPostsSQL = "select * from posts";
		mySqlConnection.query(getPostsSQL, (error, result) => {
			res.send({
				status: 201,
				posts: result,
			});
		});
	});
});

app.post("/api/getMyPosts", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		const getMyPostSQL = "select * from posts where user_name=?";
		const getMyPostParams = [req.body.name];
		mySqlConnection.query(getMyPostSQL, getMyPostParams, (error, result) => {
			if (error) {
				console.log(error);
			}
			res.send({
				status: 201,
				myPosts: result,
			});
		});
	});
});

const { createHash } = require('crypto');


app.post("/api/addPost", async (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		const saltC = 10;
		let salt = await bcrypt.genSalt(saltC);
		let hashedContent = createHash('sha256').update(req.body.content).digest('hex');

		const makePostSQL = "insert into posts values(?,?,?,?,?)";
		const makePostParams = [req.body.name, req.body.title, req.body.content, hashedContent, new Date()];
		mySqlConnection.query(makePostSQL, makePostParams, (error, result) => {
			if (error) {
				console.log(error);
			}
			res.send({
				status: 201,
			});
		});
	});
});
