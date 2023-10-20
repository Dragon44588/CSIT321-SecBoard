const express = require("express");
const app = express();

const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendemail");
const multer = require("multer");
const path = require("path");
let fileExt;
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/");
	},
	filename: function (req, file, cb) {
		fileExt = Date.now() + file.originalname;
		cb(null, fileExt);
	},
});
const upload = multer({ storage: storage });

//app.use(express.static(path.join(__dirname,'uploads')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public',)));

const { generateToken } = require("./auth");

// const axios = require('axios')
const fs = require("fs");

//const http = require("http");
const https = require("https");
const request = require("request");

// https setup
const options = {
	key: fs.readFileSync("key.pem", "utf8"),
	cert: fs.readFileSync("cert.pem", "utf8"),
};

const url = require("url");

const cors = require("cors");
const { error } = require("console");

let { PythonShell } = require("python-shell");

PythonShell.run("./blockchain/main.py", null).then((messages) => {
	// console.log(messages);
	console.log("Python script end");
});

//testing
//const privateKey = fs.readFileSync("./privkey1.pem", "utf8");
//const certificate = fs.readFileSync("./fullchain1.pem", "utf8");
//const credentials = { key: privateKey, cert: certificate };
//var httpServer = http.createServer(app);
var httpServer = https.createServer(options, app);

httpServer.listen(3210, () => {
	console.log("3210 Ports running");
});
//httpServer.listen(3210, () => {
//	console.log("3211 Ports running");
//});

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

app.use(
	express.json({
		limit: "50mb",
	})
);

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
	password: "12345678",
	port: "3306",
	database: "321db",
	charset: "utf8mb4",
});

mySqlConnection.connect(function (err) {
	if (err) throw err;
	mySqlConnection.query("SELECT * FROM posts", function (err, result, fields) {
		if (err) throw err;
		// console.log(result);
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
		mySqlConnection.query(getPostsSQL, (error, results) => {
			if (error) {
				return new Error(error);
			}
			// console.log(results);
			results.forEach((post) => {
				post.content = JSON.parse(post.content);
				const dateTime = new Date(post.timestamp);

				const year = dateTime.getFullYear();
				const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要加1
				const day = dateTime.getDate().toString().padStart(2, "0");
				const hours = dateTime.getHours().toString().padStart(2, "0");
				const minutes = dateTime.getMinutes().toString().padStart(2, "0");

				const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
				post.timestamp = formattedDate;
			});

			res.send({
				status: 201,
				posts: results,
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
		mySqlConnection.query(getMyPostSQL, getMyPostParams, (error, results) => {
			if (error) {
				return new Error(error);
			}
			results.forEach((post) => {
				post.content = JSON.parse(post.content);
				const dateTime = new Date(post.timestamp);

				const year = dateTime.getFullYear();
				const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要加1
				const day = dateTime.getDate().toString().padStart(2, "0");
				const hours = dateTime.getHours().toString().padStart(2, "0");
				const minutes = dateTime.getMinutes().toString().padStart(2, "0");

				const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
				post.timestamp = formattedDate;
			});
			res.send({
				status: 201,
				myPosts: results,
			});
		});
	});
});

const { createHash } = require("crypto");

app.post("/api/addPost", upload.single("file"), async (req, res) => {
	const loggedInToken = req.body.token;
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		const saltC = 10;
		let salt = await bcrypt.genSalt(saltC);
		let stringify_content = req.body.content;
		let hashedContent = createHash("sha256").update(stringify_content).digest("hex");

		// add post to blockchain
		let options = {
			mode: "text",
			pythonOptions: ["-u"], // get print results in real-time
			scriptPath: "../secboardback/blockchain/",
			args: [stringify_content],
		};

		PythonShell.run("addStandardBlock.py", options).then((messages) => {
			// results is an array consisting of messages collected during execution
			// console.log(messages);
		});

		const makePostSQL = "insert into posts values(?,?,?,?,?,?,?,?,?)";
		const makePostParams = [null, decoded.email, req.body.name, 0, req.body.title, req.body.content, hashedContent, new Date(), req.body.post_color];
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

app.post("/api/addDeleteRequest", async (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		const makePostSQL = "insert into deletion_requests values(?,?,?,?,?,?,?)";
		const current = new Date();
		const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
		const makePostParams = [req.body.post_id, date, decoded.email, req.body.name, req.body.title, JSON.stringify(req.body.content), "pending"];
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
function addDeleteRequest(id, email, name, title, content) {
	const makePostSQL = "insert into deletion_requests values(?,?,?,?,?,?,?)";
	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
	const makePostParams = [id, date, email, name, title, content, "pending"];
	mySqlConnection.query(makePostSQL, makePostParams, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
}

app.post("/api/getDeleteRequest", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		/**
		 * SELECT 
    dr.*,
    COALESCE(votes.yes_votes, 0) AS yes_votes,
    COALESCE(votes.no_votes, 0) AS no_votes,
    CASE 
        WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'
        WHEN v.vote_yes_or_no = 0 THEN 'voted_no'
        ELSE ''
    END AS did_u_vote
FROM 
    deletion_requests dr
LEFT JOIN 
    (SELECT 
        post_id,
        SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,
        SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes
    FROM 
        Votes
    GROUP BY 
        post_id) votes ON dr.post_id = votes.post_id
LEFT JOIN 
    Votes v ON dr.post_id = v.post_id AND v.email = ?;

		 */
		const getPostsSQL = "SELECT dr.*,COALESCE(votes.yes_votes, 0) AS yes_votes,COALESCE(votes.no_votes, 0) AS no_votes,CASE WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'WHEN v.vote_yes_or_no = 0 THEN 'voted_no'ELSE '' END AS did_u_vote FROM deletion_requests dr LEFT JOIN (SELECT post_id,SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes GROUP BY post_id) votes ON dr.post_id = votes.post_id LEFT JOIN Votes v ON dr.post_id = v.post_id AND v.email = ? WHERE dr.email = ?";
		const pra = [decoded.email, decoded.email];
		mySqlConnection.query(getPostsSQL, pra, (error, result) => {
			if (error) {
				console.error("Error executing query:", error);
				return;
			}
			result.forEach((post) => {
				post.originalMessage = JSON.parse(post.originalMessage);
				// post.newMessage = JSON.parse(post.newMessage);
			});

			// console.log(result);
			res.send({
				status: 201,
				deletion_requests: result,
			});
		});
	});
});

app.post("/api/getAllDeleteRequest", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		/**
		 * SELECT 
	dr.*,
	COALESCE(votes.yes_votes, 0) AS yes_votes,
	COALESCE(votes.no_votes, 0) AS no_votes,
	CASE 
		WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'
		WHEN v.vote_yes_or_no = 0 THEN 'voted_no'
		ELSE ''
	END AS did_u_vote
FROM 
	deletion_requests dr
LEFT JOIN 
	(SELECT 
		post_id,
		SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,
		SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes
	FROM 
		Votes
	GROUP BY 
		post_id) votes ON dr.post_id = votes.post_id
LEFT JOIN 
	Votes v ON dr.post_id = v.post_id AND v.email = ?;

		 */
		const getPostsSQL = "SELECT dr.*,COALESCE(votes.yes_votes, 0) AS yes_votes,COALESCE(votes.no_votes, 0) AS no_votes,CASE WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'WHEN v.vote_yes_or_no = 0 THEN 'voted_no'ELSE '' END AS did_u_vote FROM deletion_requests dr LEFT JOIN (SELECT post_id,SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes GROUP BY post_id) votes ON dr.post_id = votes.post_id LEFT JOIN Votes v ON dr.post_id = v.post_id AND v.email = ?";
		const pra = [decoded.email];
		mySqlConnection.query(getPostsSQL, pra, (error, result) => {
			if (error) {
				console.error("Error executing query:", error);
				return;
			}
			result.forEach((post) => {
				post.originalMessage = JSON.parse(post.originalMessage);
				// post.newMessage = JSON.parse(post.newMessage);
			});

			console.log(result);
			res.send({
				status: 201,
				deletion_requests: result,
			});
		});
	});
});

app.post("/api/handle_delete_request", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		// if (handleDeleteRequest(req.body.post_id, req.body.yes_or_no, decoded.email)) {
		// 	res.send({
		// 		status: 200,
		// 	});
		// }
		const accept_delete_SQL = "insert into Votes values (?, ?, ?, ?)";
		const accept_delte_Param = [req.body.post_id, "Delete", req.body.yes_or_no, decoded.email];
		mySqlConnection.query(accept_delete_SQL, accept_delte_Param, (error, result) => {
			if (error) {
				return console.log(error);
			}
			res.send({
				status: 200,
			});
		});
	});
});
app.post("/api/handle_report_request", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		// if (handleDeleteRequest(req.body.post_id, req.body.yes_or_no, decoded.email)) {
		// 	res.send({
		// 		status: 200,
		// 	});
		// }
		const accept_delete_SQL = "insert into Votes values (?, ?, ?, ?)";
		const accept_delte_Param = [req.body.post_id, "report", req.body.yes_or_no, decoded.email];
		mySqlConnection.query(accept_delete_SQL, accept_delte_Param, (error, result) => {
			if (error) {
				return console.log(error);
			}
			res.send({
				status: 200,
			});
		});
	});
});

app.post("/api/addReportRequest", async (req, res) => {
	//Add error handling, Check if it's already reported or already in delete request and if admin reports immediatley goes to delete requests
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		// let alreadyRequested = false;

		//Check if post is already reported or in the vote to be deleted
		mySqlConnection.query("select * from report_requests where post_id = ?", [req.body.post_id], (error, result) => {
			if (error) {
				console.log(error);
				return;
			}
			if (result.length > 0) {
				//If it's already been reported
				// alreadyRequested = true;
				res.send({
					status: 201,
					message: "Already in progress of being reported",
				});
				return;
			}
			const makePostSQL = "insert into report_requests values(?,?,?,?,?,?,?)";
			const current = new Date();
			const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
			const makePostParams = [req.body.post_id, date, decoded.email, req.body.name, req.body.title, JSON.stringify(req.body.content), "pending"];
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
});

app.post("/api/getReportRequest", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		/**
		 * SELECT 
	rr.*,
	COALESCE(votes.yes_votes, 0) AS yes_votes,
	COALESCE(votes.no_votes, 0) AS no_votes,
	CASE 
		WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'
		WHEN v.vote_yes_or_no = 0 THEN 'voted_no'
		ELSE ''
	END AS did_u_vote
FROM 
	report_requests rr
LEFT JOIN 
	(SELECT 
		post_id,
		SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,
		SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes
	FROM 
		Votes
	WHERE
		request_type = 'report'
	GROUP BY 
		post_id) votes ON rr.post_id = votes.post_id
LEFT JOIN 
	Votes v ON rr.post_id = v.post_id AND v.email = ?;

		 */
		// const getPostsSQL = "SELECT rr.*,COALESCE(votes.yes_votes, 0) AS yes_votes,COALESCE(votes.no_votes, 0) AS no_votes,CASE WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'WHEN v.vote_yes_or_no = 0 THEN 'voted_no'ELSE '' END AS did_u_vote FROM report_requests rr LEFT JOIN (SELECT post_id,SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes WHERE request_type = 'report' GROUP BY post_id) votes ON rr.post_id = votes.post_id LEFT JOIN Votes v ON rr.post_id = v.post_id AND v.email = ?";
		const getPostsSQL = "SELECT rr.*, COALESCE(votes.yes_votes, 0) AS yes_votes, COALESCE(votes.no_votes, 0) AS no_votes, CASE WHEN COALESCE(votes.yes_votes, 0) = 0 AND COALESCE(votes.no_votes, 0) = 0 THEN '' WHEN v.vote_yes_or_no = 1 THEN 'voted_yes' WHEN v.vote_yes_or_no = 0 THEN 'voted_no' ELSE '' END AS did_u_vote FROM report_requests rr LEFT JOIN (SELECT post_id, SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes, SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes WHERE request_type = 'report' GROUP BY post_id) votes ON rr.post_id = votes.post_id LEFT JOIN Votes v ON rr.post_id = v.post_id AND v.email = ? AND v.request_type = 'Report';";
		const pra = [decoded.email];
		mySqlConnection.query(getPostsSQL, pra, (error, result) => {
			if (error) {
				console.error("Error executing query:", error);
				return;
			}
			result.forEach((post) => {
				post.originalMessage = JSON.parse(post.originalMessage);
				// post.newMessage = JSON.parse(post.newMessage);
			});

			// console.log(result);
			console.log(result);
			res.send({
				status: 201,
				report_requests: result,
			});
		});
	});
});

// app.post("/api/handleReportRequest", (req, res) => {
// 	const loggedInToken = req.body.token;
// 	const enoughNoVotes = 3;
// 	// verifyRoomToken(loggedInToken, next)
// 	const secretKey = process.env.ACCESS_TOKEN_SECRET;
// 	const removeRequestSQL = "delete from report_requests where post_id = ?;"; //Removes From report Request table
// 	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
// 		if (err) {
// 			return new Error("Authentication error");
// 		} else if (req.body.yes_or_no === 1) {
// 			//If the vote is yes (only needs one yes vote for it to be voted on deletion)
// 			mySqlConnection.query(removeRequestSQL, [req.body.post_id], (error, result) => {
// 				if (error) {
// 					return console.log(error);
// 				}
// 				console.log("id:" + req.body.post_id + ", email:" + req.body.email + ", name:" + req.body.name + ", title:" + req.body.title + ", content:" + req.body.content);
// 				addDeleteRequest(req.body.post_id, req.body.email, req.body.name, req.body.title, req.body.content); //Adds delete request
// 				handleDeleteRequest(req.body.post_id, req.body.yes_or_no, decoded.email); //Adds vote toward delete request
// 				res.send({
// 					status: 200,
// 				});
// 			});
// 		} else {
// 			//If the vote is no
// 			const accept_report_SQL = "insert into Votes values (?, ?, ?, ?)";
// 			const accept_report_Param = [req.body.post_id, "Report", req.body.yes_or_no, decoded.email];
// 			mySqlConnection.query(accept_report_SQL, accept_report_Param, (error, result) => {
// 				if (error) {
// 					return console.log(error);
// 				}
// 				const voteCountSQL = "select COUNT(post_id) as votes from votes where post_id = ? && vote_yes_or_no = 0 && request_type = 'Report';";
// 				mySqlConnection.query(voteCountSQL, [req.body.post_id], (error, result) => {
// 					if (result[0].votes >= enoughNoVotes) {
// 						//remove post from report request
// 						mySqlConnection.query(removeRequestSQL, [req.body.post_id], (error, result) => {
// 							if (error) {
// 								return console.log(error);
// 							}
// 						});
// 					}
// 				});
// 				res.send({
// 					status: 200,
// 				});
// 			});
// 		}
// 	});
// });

app.post("/api/addEditRequest", async (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		console.log(typeof req.body.content);
		console.log(typeof req.body.origin_content);
		const add_edit_request_SQL = "insert into edit_requests values(?,?,?,?,?,?,?,?,?)";
		const current = new Date();
		const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
		const add_edit_request_Params = [req.body.post_id, date, decoded.email, req.body.name, req.body.origin_title, req.body.origin_content, req.body.title, req.body.content, "pending"];
		mySqlConnection.query(add_edit_request_SQL, add_edit_request_Params, (error, result) => {
			if (error) {
				console.log(error);
				return;
			}
			res.send({
				status: 201,
			});
		});
	});
});

app.post("/api/getEditRequest", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		/**
		 * SELECT 
    er.*,
    COALESCE(votes.yes_votes, 0) AS yes_votes,
    COALESCE(votes.no_votes, 0) AS no_votes,
    CASE 
        WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'
        WHEN v.vote_yes_or_no = 0 THEN 'voted_no'
        ELSE ''
    END AS did_u_vote
FROM 
    edit_requests er
LEFT JOIN 
    (SELECT 
        post_id,
        SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,
        SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes
    FROM 
        Votes
    GROUP BY 
        post_id) votes ON er.post_id = votes.post_id
LEFT JOIN 
    Votes v ON er.post_id = v.post_id AND v.email = ?;

		 */
		const getPostsSQL = "SELECT er.*,COALESCE(votes.yes_votes, 0) AS yes_votes,COALESCE(votes.no_votes, 0) AS no_votes,CASE WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'WHEN v.vote_yes_or_no = 0 THEN 'voted_no'ELSE '' END AS did_u_vote FROM edit_requests er LEFT JOIN (SELECT post_id,SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes GROUP BY post_id) votes ON er.post_id = votes.post_id LEFT JOIN Votes v ON er.post_id = v.post_id AND v.email = ? WHERE er.email = ?;";
		const pra = [decoded.email, decoded.email];
		mySqlConnection.query(getPostsSQL, pra, (error, result) => {
			if (error) {
				console.error("Error executing query:", error);
				return;
			}
			result.forEach((post) => {
				post.originMessage = JSON.parse(post.originMessage);
				post.newMessage = JSON.parse(post.newMessage);
			});

			// console.log(result);
			res.send({
				status: 201,
				edit_requests: result,
			});
		});
	});
});

app.post("/api/getAllEditRequest", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}
		/**
		 * SELECT 
	er.*,
	COALESCE(votes.yes_votes, 0) AS yes_votes,
	COALESCE(votes.no_votes, 0) AS no_votes,
	CASE 
		WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'
		WHEN v.vote_yes_or_no = 0 THEN 'voted_no'
		ELSE ''
	END AS did_u_vote
FROM 
	edit_requests er
LEFT JOIN 
	(SELECT 
		post_id,
		SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,
		SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes
	FROM 
		Votes
	GROUP BY 
		post_id) votes ON er.post_id = votes.post_id
LEFT JOIN 
	Votes v ON er.post_id = v.post_id AND v.email = ?;

		 */
		const getPostsSQL = "SELECT er.*,COALESCE(votes.yes_votes, 0) AS yes_votes,COALESCE(votes.no_votes, 0) AS no_votes,CASE WHEN v.vote_yes_or_no = 1 THEN 'voted_yes'WHEN v.vote_yes_or_no = 0 THEN 'voted_no'ELSE '' END AS did_u_vote FROM edit_requests er LEFT JOIN (SELECT post_id,SUM(CASE WHEN vote_yes_or_no = 1 THEN 1 ELSE 0 END) AS yes_votes,SUM(CASE WHEN vote_yes_or_no = 0 THEN 1 ELSE 0 END) AS no_votes FROM Votes GROUP BY post_id) votes ON er.post_id = votes.post_id LEFT JOIN Votes v ON er.post_id = v.post_id AND v.email = ?;";
		const pra = [decoded.email];
		mySqlConnection.query(getPostsSQL, pra, (error, result) => {
			if (error) {
				console.error("Error executing query:", error);
				return;
			}
			result.forEach((post) => {
				post.originMessage = JSON.parse(post.originMessage);
				post.newMessage = JSON.parse(post.newMessage);
			});

			// console.log(result);
			res.send({
				status: 201,
				edit_requests: result,
			});
		});
	});
});

app.post("/api/handle_edit_request", (req, res) => {
	const loggedInToken = req.body.token;
	// verifyRoomToken(loggedInToken, next)
	const secretKey = process.env.ACCESS_TOKEN_SECRET;
	jwt.verify(loggedInToken.split(" ")[1], secretKey, async (err, decoded) => {
		if (err) {
			return new Error("Authentication error");
		}

		const accept_edit_SQL = "insert into Votes values (?, ?, ?, ?)";
		const accept_edit_Param = [req.body.post_id, "Edit", req.body.yes_or_no, decoded.email];
		mySqlConnection.query(accept_edit_SQL, accept_edit_Param, (error, result) => {
			if (error) {
				return console.log(error);
			}
		});

		// check if yes votes == 2 (correction block added) or no votes == 2 (request denied)
		// check if vote SUCCEEDED
		mySqlConnection.query("SELECT vote_yes_or_no FROM Votes WHERE post_id = " + req.body.post_id + " AND vote_yes_or_no = 1", (error, result) => {
			if (error) {
				return console.log(error);
			}
			if (result.length == 2) {
				// update page to reflect that vote failed
				// run python code to add correction block with new data\
				let options = {
					mode: "text",
					pythonOptions: ["-u"], // get print results in real-time
					scriptPath: "../secboardback/blockchain/",
					args: [req.body.content, "Election", req.body.post_id + 1], // adding correction block requires the following:
					// the message content
					// the election hash, to be added in future
					// (post_id + 1) which equals the block number, as block 1 is genesis and post 1 is block 2 added after the genesis
				};

				PythonShell.run("addCorrectionBlock.py", options).then((messages) => {
					// results is an array consisting of messages collected during execution
					console.log(messages);
				});
			}
		});

		// check if vote FAILED
		mySqlConnection.query("SELECT vote_yes_or_no FROM Votes WHERE post_id = " + req.body.post_id + " AND vote_yes_or_no = 0", (error, result) => {
			if (error) {
				return console.log(error);
			}
			if (result.length == 2) {
				// update page to reflect that vote failed
			}
			res.send({
				status: 200,
			});
		});
	});
});

app.post("/api/forgotpassword", async (req, res) => {
	console.log("forgotPassword Request Recieved");
	//Check if email exists
	const authEmailSQL = "select * from users_info where email=?";
	const authEmail = [req.body.email];
	mySqlConnection.query(authEmailSQL, authEmail, async (error, result) => {
		if (result.length !== 0) {
			//The email exists, create token and link to reset password
			const token = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
			const resetLink = req.headers.origin + "/resetpassword/" + req.body.email + "/" + token;
			//Update sql db, user's token
			const updateTokenSQL = "UPDATE users_info SET token = ? WHERE email = ?;";
			mySqlConnection.query(updateTokenSQL, [token, authEmail], (error, result) => {
				if (error) {
					return res.send({
						status: 400,
						message: "insert token error",
					});
				}
				//send out the mail to reset the password
				sendEmail(req.body.email, "Secboard password reset", "Click the below link to reset ur password \n" + resetLink); //sends email
				res.send({
					status: 200,
					message: "Reset password email has been sent",
				});
			});
		} else {
			//The email does not exist
			res.send({
				status: 401,
				message: "Email does not exist",
			});
		}
	});
});

app.post("/api/resetpassword", async (req, res) => {
	console.log("resetpassword Request Recieved");
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
				message: "Token has expired or is incorrect",
			});
		}
		//Check if user and token exist
		const verifyUserTokenSQL = "Select * from users_info WHERE email = ? && token = ?;";
		mySqlConnection.query(verifyUserTokenSQL, [email, token], async (error, result) => {
			if (result.length !== 0) {
				//User and token do exist
				//Update password
				const updatePasswordSQL = "UPDATE users_info SET password = ? WHERE email = ? && token = ?;";
				mySqlConnection.query(updatePasswordSQL, [bcPasword, email, token], async (error, result) => {
					if (error) {
						return res.send({
							status: 400,
							message: "update password error",
						});
					}
					//remove token from db
					const removeTokenSQL = "UPDATE users_info set token = '' WHERE email = ?;";
					mySqlConnection.query(removeTokenSQL, email, async (error, result) => {
						if (error) {
							return res.send({
								status: 400,
								message: "remove token error",
							});
						}
						res.send({
							//Everything worked out
							status: 200,
							message: "Password has been reset",
						});
					});
				});
			} else {
				return res.send({
					//User and token do not exist
					status: 400,
					message: "User and token do not exist",
				});
			}
		});
	});
});
