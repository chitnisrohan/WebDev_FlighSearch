module.exports = function (app, model) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);


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
                    res.send(newUser);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        if(req.query.username && req.query.password) {
            findUserByCredential(req, res);
        } else {
            findUserByUsername(req, res);
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

};