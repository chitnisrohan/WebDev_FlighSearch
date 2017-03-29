module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var MessageSchema = require("./message.schema.server.js")();
    var MessageModel = mongoose.model("MessageModel", MessageSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        setUpAlert : setUpAlert,
        findAlertsForUser : findAlertsForUser,
        deleteAlert : deleteAlert,
        findAllAlerts : findAllAlerts,
        updateMessage : updateMessage,
        addAgentToDeleteList : addAgentToDeleteList,
        getAllNotifications : getAllNotifications
    };
    return api;

    function getAllNotifications(userId) {
        var deferred = Q.defer();
        MessageModel
            .find({userid : userId, response : true}, function (err, notifications) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(notifications);
                }
            });
        return deferred.promise;
    }
    
    function addAgentToDeleteList(alert, agentId) {
        var deferred = Q.defer();
        MessageModel
            .update({_id : alert._id}, {$push : {NotVisibleForAgents : agentId}}, 
            function (err, alerts) {
                if (err) {
                    deferred.reject(err);
                } else {
                    MessageModel
                        .find({}, function (err, alerts) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(alerts);
                            }
                        });
                }
            });
        return deferred.promise;
    }
    
    function updateMessage(alert) {
        var deferred = Q.defer();
        MessageModel
            .update({_id : alert._id}, alert, function (err, alerts) {
                if (err) {
                    deferred.reject(err);
                } else {
                    MessageModel
                        .find({}, function (err, alerts) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(alerts);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function findAllAlerts() {
        var deferred = Q.defer();
        MessageModel
            .find({},function (err, alerts) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(alerts);
                }
            });
        return deferred.promise;
    }

    function deleteAlert(alertId) {
        var deferred = Q.defer();
        MessageModel
            .remove({_id : alertId}, function (err, alerts) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(alerts);
                }
            });
        return deferred.promise;
    }

    function findAlertsForUser(userId) {
        var deferred = Q.defer();
        MessageModel
            .find({userid : userId}, function (err, alerts) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(alerts);
                }
            });
        return deferred.promise;
    }

    function setUpAlert(journey) {
        var deferred = Q.defer();
        MessageModel
            .create(journey,function (err, alerts) {
                if(err) {
                    deferred.reject(err);
                } else {
                    MessageModel
                        .find({userid : journey.userid}, function (err, messages) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(messages);
                            }
                        })
                }
            });
        return deferred.promise;
    }

    function setModel(_model) {
        model = _model;
    }


};