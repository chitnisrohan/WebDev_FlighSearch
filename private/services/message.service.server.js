module.exports = function (app, model) {

    app.delete("/api/deleteFromAgentHistory/:messageId/:agentId", deleteFromAgentHistory);
    app.post("/api/:userId/setupAlert", setupAlert);
    app.get("/api/alerts/:userId", findAlertsForUser);
    app.delete("/api/alerts/:alertId", deleteAlert);
    app.get("/api/allAlerts", findAllAlerts);
    app.put("/api/sendMessage", sendMessage);
    app.put("/api/deleteMessage/:agentId", deleteMessageForAgent);
    app.get("/api/getAllNotifications/:userId", getAllNotifications);
    app.get("/api/getAgentHistory/:agentId", getAgentHistory);


    function deleteFromAgentHistory(req, res) {
        var messageId = req.params.messageId;
        var agentId = req.params.agentId;
        model
            .messageModel
            .deleteFromAgentHistory(messageId, agentId)
            .then(
                function (history) {
                    res.json(history);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function getAgentHistory(req, res) {
        var agentId = req.params.agentId;
        model
            .messageModel
            .getAgentHistory(agentId)
            .then(
                function (history) {
                    res.json(history);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function getAllNotifications(req, res) {
        var userId = req.params.userId;
        model
            .messageModel
            .getAllNotifications(userId)
            .then(
                function (notifications) {
                    res.json(notifications);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteMessageForAgent(req, res) {
        var agentId = req.params.agentId;
        var alert = req.body;
        model
            .messageModel
            .addAgentToDeleteList(alert, agentId)
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function sendMessage(req, res) {
        var alert = req.body;
        model
            .messageModel
            .updateMessage(alert)
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findAllAlerts(req, res) {
        model
            .messageModel
            .findAllAlerts()
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function deleteAlert(req, res) {
        var alertId = req.params.alertId;
        model
            .messageModel
            .deleteAlert(alertId)
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }
    
    function findAlertsForUser(req, res) {
        var userId = req.params.userId;
        model
            .messageModel
            .findAlertsForUser(userId)
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function setupAlert(req, res) {
        var userId = req.params.userId;
        var journey = req.body;
        delete journey.noOfAdults;
        delete journey.noOfChildren;
        delete journey.selectedClass;
        journey.departDate = journey.departDate.split("T")[0];
        if (journey.returnDate) {
            journey.returnDate = journey.returnDate.split("T")[0];
        }
        journey.response = false;
        journey.userid = userId;
        model
            .messageModel
            .setUpAlert(journey)
            .then(
                function (alerts) {
                    res.json(alerts);
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );
    }


};