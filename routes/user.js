const express = require('express');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require("bcrypt")
const passport = require("passport");

// Register page
router.get("/register", (req, res) => {
    res.render("register");
});

// login page
router.get("/login", (req, res) => {
    res.render("login")
});

router.post("/register", (req, res) => {
    // object distructure

    const {
        username,
        email,
        password
    } = req.body;

    let errors = [];

    // check for empty field
    if (!username || !email || !password) {
        errors.push({
            msg: "All field is required"
        });
    }

    // check password length

    if (password.length < 6) {
        errors.push({
            msg: "Password at least 6 character"
        });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            username,
            email,
            password
        });
    } else {
        // validation is passed
        User.findOne({
                email: email
            })
            .then((user) => {
                if (user) {
                    errors.push({
                        msg: "Email already exsist"
                    });
                    res.render("register", {
                        errors,
                        username,
                        email,
                        password
                    });
                } else {
                    const data = {
                        username,
                        email,
                        password
                    };
                    const newUser = new User(data);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then((user) => {
                                    req.flash("success_msg", "you are register now you can login")
                                    res.redirect("/user/login")
                                })
                                .catch(err => console.log(err))
                        });
                    });
                }
            });
    }



});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashborad",
        failureRedirect: "/user/login",
        failuerFlash: true
    })(req, res, next);
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/user/login")
})
module.exports = router;