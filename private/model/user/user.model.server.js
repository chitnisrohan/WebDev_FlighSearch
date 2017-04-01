module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("NewUserModel", UserSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        findUserByUsername : findUserByUsername,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        createUser : createUser,
        updateUser : updateUser,
        finAllUsers : finAllUsers,
        deleteUser : deleteUser
    };
    return api;

    function deleteUser(userId) {
        var deferred = Q.defer();
        findUserById(userId)
            .then(
                function (user) {
                    if (user.userType === "USER") {
                        // find all alerts created by user
                        // delete all alerts created by user
                        // then delete user
                        model
                            .messageModel
                            .findAlertsForUser(userId)
                            .then(
                                function (alerts) {
                                    for (var i = 0; i < alerts.length ; i++) {
                                        model
                                            .messageModel
                                            .deleteAlert(alerts[i]._id)
                                            .then(
                                                function () {

                                                },
                                                function (err) {
                                                    deferred.reject(err);
                                                }
                                            );
                                    }
                                    UserModel
                                        .remove({_id : userId}, function (err, users) {
                                            if (err) {
                                                deferred.reject(err);
                                            } else {
                                                deferred.resolve(userId);
                                            }
                                        });
                                }, function (err) {
                                    deferred.reject(err);
                                }
                            );

                    } else if (user.userType === "AGENT") {
                        // find all alerts
                        // from every alert, remove agent id if present in NotVisibleForAgents, AgentsResponded
                        // delete user
                        model
                            .messageModel
                            .findAllAlerts()
                            .then(
                                function (alerts) {
                                    for (var i = 0; i < alerts.length ; i++) {
                                        var notVisibleAgent = alerts[i].NotVisibleForAgents;
                                        if (notVisibleAgent.indexOf(userId) != -1) {
                                            notVisibleAgent.splice(notVisibleAgent.indexOf(userId), 1);
                                        }
                                        var agentRespondedArray = alerts[i].AgentsResponded;
                                        var agentRespondedArray2 = alerts[i].AgentsResponded;
                                        for (var j = 0; j < agentRespondedArray.length ; j++) {
                                            if (agentRespondedArray[j]._id == userId) {
                                                agentRespondedArray2.splice(j,1);
                                            }
                                        }
                                        model
                                            .messageModel
                                            .updateMessageAfterAgentDeletion(alerts[i]._id, notVisibleAgent, agentRespondedArray2)
                                            .then(
                                                function () {

                                                },
                                                function (err) {
                                                    deferred.reject(err);
                                                }
                                            )
                                    }
                                    UserModel
                                        .remove({_id : userId}, function (err, users) {
                                            if (err) {
                                                deferred.reject(err);
                                            } else {
                                                deferred.resolve(userId);
                                            }
                                        });

                                },
                                function (err) {
                                    deferred.reject(err);
                                }
                            )
                    }
                },
                function (err) {
                    deferred.reject(err);
                }
            );
        return deferred.promise;
    }

    function finAllUsers() {
        var deferred = Q.defer();
        UserModel
            .find({}, function (err, users) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = Q.defer();
        UserModel
            .update({"_id": userId}, {$set : {firstName : newUser.firstName, lastName : newUser.lastName
        , email : newUser.email}},
                function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


    function createUser(user) {
        var deferred = Q.defer();
        UserModel
            .create(user, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = Q.defer();
        UserModel
            .findOne({"username": username}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = Q.defer();
        UserModel
            .findOne({_id: userId}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = Q.defer();
        UserModel
            .findOne({"username": username, "password": password}, function (err, user) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


    function setModel(_model) {
        model = _model;
    }


};