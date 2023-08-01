const express = require("express");
const app = express();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendemail");

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

mySqlConnection.connect(function (err) {
	if (err) throw err;
	mySqlConnection.query("SELECT * FROM posts", function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
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
	const createUserSQL = "insert into users_info values(?,?,?,null)";
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

app.post("/api/forgotpassword", async (req, res) => {
	console.log('forgotPassword Request Recieved');
	//Check if email exists
	const authEmailSQL = "select * from users_info where email=?";
	const authEmail = [req.body.email];
	mySqlConnection.query(authEmailSQL, authEmail, async (error, result) => {
		if (result.length !== 0) {//The email exists, create token and link to reset password
			const token = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
			const resetLink = req.headers.origin + '/resetpassword/' + req.body.email + '/' + token;
			//Update sql db, user's token
			const updateTokenSQL = "UPDATE users_info SET token = ? WHERE email = ?;";
			mySqlConnection.query(updateTokenSQL, [token, authEmail], (error, result) => {
				if (error) {
					return res.send({
						status: 400,
						message: 'insert token error'
					});
				}
				//send out the mail to reset the password	
				sendEmail(req.body.email, "Secboard password reset", 'Click the below link to reset ur password \n' + resetLink);//sends email
				res.send({
					status: 200,
					message: 'Reset password email has been sent'
				});
			});

		} else {//The email does not exist
			res.send({
				status: 401,
				message: "Email does not exist",
			});
		}
	});

});

app.post("/api/resetpassword", async (req, res) => {
	console.log('resetpassword Request Recieved');
	const token = req.body.token;
	const email = req.body.email;
	const saltC = 10;
	let salt = await bcrypt.genSalt(saltC);
	let bcPasword = await bcrypt.hash(req.body.password, salt);
	//Confirm token is not expired and is real
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
		if (err) {
			return res.send({
				status: 400,
				message: 'Token has expired or is incorrect'
			});
		}
		//Check if user and token exist
		const verifyUserTokenSQL = "Select * from users_info WHERE email = ? && token = ?;";
		mySqlConnection.query(verifyUserTokenSQL, [email, token], async (error, result) => {
			if (result.length !== 0) {//User and token do exist
				//Update password
				const updatePasswordSQL = "UPDATE users_info SET password = ? WHERE email = ? && token = ?;";
				mySqlConnection.query(updatePasswordSQL, [bcPasword, email, token], async (error, result) => {
					if (error) {
						return res.send({
							status: 400,
							message: 'update password error'
						});
					}
					//remove token from db
					const removeTokenSQL = "UPDATE users_info set token = '' WHERE email = ?;";
					mySqlConnection.query(removeTokenSQL, email, async (error, result) => {
						if (error) {
							return res.send({
								status: 400,
								message: 'remove token error'
							});
						}
						res.send({//Everything worked out
							status: 200,
							message: 'Password has been reset'
						});
					});
				});
			} else {
				return res.send({//User and token do not exist
					status: 400,
					message: 'User and token do not exist'
				});
			}
		});

	});
});