const express = require("express");

const router = express.Router();

const {
	ensureAuthenticate
} = require("../config/auth");

router.get("/", (req, res) => {
	res.render("welcome")
	// res.send("helo")
});

router.get("/dashborad", ensureAuthenticate, (req, res) => {
	res.render("dashboard", {
		name: req.user.username
	})
})
module.exports = router;