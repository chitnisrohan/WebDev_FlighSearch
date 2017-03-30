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
        getAllNotifications : getAllNotifications,
        getAgentHistory : getAgentHistory,
        deleteFromAgentHistory : deleteFromAgentHistory
    };
    return api;

    function deleteFromAgentHistory(messageId, agentId) {
        var deferred = Q.defer();
        MessageModel
            .update({_id : messageId}, {$push : {NotVisibleForAgents : agentId}},
            function (err, status) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(status);
                }
            });
        return deferred.promise;
    }

    function getAgentHistory(agentId) {
        var deferred = Q.defer();
        MessageModel
            .find({},function (err, messages) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var agentHistory = [];
                    for (var m in messages) {
                        var msg = messages[m];

                        console.log();
                        if (msg.NotVisibleForAgents.indexOf(agentId) != -1) {
                            continue;
                        }

                        for (var a = 0; a < msg.AgentsResponded.length ; a++) {
                            var b = msg.AgentsResponded[a];
                            var c = {agentId : b._id, message : b.message};
                            if (c.agentId == agentId) {
                                var singleMessage = {source : msg.source,
                                    destination : msg.destination,
                                    departDate : msg.departDate,
                                    returnDate : msg.returnDate,
                                    message : c.message,
                                    userid : msg.userid,
                                    messageId : msg._id};
                                agentHistory.push(singleMessage)
                            }
                        }
                    }
                    deferred.resolve(agentHistory);
                }
            });
        return deferred.promise;
    }

    function getAllNotifications(userId) {
        var deferred = Q.defer();
        MessageModel
            .find({userid : userId}, function (err, notifications) {
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