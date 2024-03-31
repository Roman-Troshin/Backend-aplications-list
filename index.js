const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
	addAplication,
	getAplications,
	removeAplication,
} = require("./aplications.controller");
const { addUser, loginUser } = require("./users.controller");
const auth = require("./middlewares/auth");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.get("/login", async (req, res) => {
	res.render("login", {
		title: "Express App",
		error: undefined,
	});
});

app.post("/login", async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);

		res.cookie("token", token, { httpOnly: true });

		res.redirect("/application");
	} catch (e) {
		res.render("login", {
			title: "Express App",
			error: e.message,
		});
	}
});

app.get("/register", async (req, res) => {
	res.render("register", {
		title: "Express App",
		error: undefined,
	});
});

app.post("/register", async (req, res) => {
	try {
		await addUser(req.body.email, req.body.password);

		res.redirect("/login");
	} catch (e) {
		if (e.code === 11000) {
			res.render("register", {
				title: "Express App",
				error: "Email is already registed",
			});

			return;
		}
		res.render("register", {
			title: "Express App",
			error: e.message,
		});
	}
});

app.get("/logout", (req, res) => {
	res.cookie("token", "", { httpOnly: true });

	res.redirect("/login");
});

app.use(auth);

app.get("/application", async (req, res) => {
	res.render("application", {
		title: "Express App",
		created: false,
		error: undefined,
	});
});

app.post("/application", async (req, res) => {
	try {
		await addAplication(
			req.body.username,
			req.body.phonenumber,
			req.body.message
		);
		res.render("application", {
			title: "Express App",
			created: true,
			error: false,
		});
	} catch (e) {
		console.log("Creation error", e);
		res.render("application", {
			title: "Express App",
			created: false,
			error: true,
		});
	}
});

app.get("/", async (req, res) => {
	res.render("index", {
		title: "Express App",
		applications: await getAplications(),
		error: false,
	});
});

app.delete("/:id", async (req, res) => {
	try {
		await removeAplication(req.params.id);
		res.render("index", {
			title: "Express App",
			applications: await getAplications(),
			error: false,
		});
	} catch (e) {
		res.render("index", {
			title: "Express App",
			applications: await getAplications(),
			error: e.message,
		});
	}
});

mongoose
	.connect(
		"mongodb+srv://RomanTroshin:qwerty123@cluster0.e0pjrq9.mongodb.net/applications?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`));
		});
	});
