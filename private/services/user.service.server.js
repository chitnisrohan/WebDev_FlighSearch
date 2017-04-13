module.exports = function (app, model) {

    app.get("/api/user/securityquestion", findSecurityQuestionByUsername);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);
    app.get("/api/allUsers", findAllUsers);
    app.post("/api/checkLogin", checkLogin);
    app.post("/api/logout", logout);
    app.get("/api/findCurrentUser",findCurrentUser);
    app.post("/api/login/recovery", loginWithRecovery);


    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/user/flightSearch',
            failureRedirect: '/#/login'
        }));



    app.post('/api/login', passport.authenticate('local'), login);

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    } else if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    var googleConfig = {
        clientID     : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            },
                            userType : 'USER'
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }





    function loginWithRecovery(req, res) {
        var user = req.body;
        if (user.username && user.passwordRecoveryAnswer){
            findUserByRecoveryCredentials(req,res);
        }
    }


    function findCurrentUser(req, res) {
        res.json(req.user);
    }

    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function findSecurityQuestionByUsername (req, res) {
        var username = req.query.username;
        model
            .userModel
            .findSecurityQuestionByUsername(username)
            .then(
                function (securityQuestion) {
                    res.send(securityQuestion);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        model
            .userModel
            .finAllUsers()
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        var newUser = req.body;
        model
            .userModel
            .createUser(newUser)
            .then(
                function (newUser) {
                    req.login(newUser, function (err) {
                        res.json(newUser);
                    });
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        if (typeof req.query.password == "undefined" && typeof req.query.passwordRecoveryAnswer == "undefined") {
            findUserByUsername(req, res);
        }
        else {
            if(req.query.username && req.query.password != "") {
                findUserByCredential(req, res);
            } else {
                if (req.query.username && req.query.passwordRecoveryAnswer){
                    findUserByRecoveryCredentials(req,res);
                }
            }
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.sendStatus(400);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByCredential(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.send(user);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUserByRecoveryCredentials(req, res) {
        var user = req.body;
        var username = user.username;
        var passwordRecoveryAnswer = user.passwordRecoveryAnswer;
        model
            .userModel
            .findUserByRecoveryCredentials(username, passwordRecoveryAnswer)
            .then(
                function (user) {
                    req.login(user, function (err) {
                        res.send(user);
                    });
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


};