module.exports = function (app, model) {

    app.post("/api/:userId/setupAlert", setupAlert);
    app.get("/api/alerts/:userId", findAlertsForUser);
    app.delete("/api/alerts/:alertId", deleteAlert);

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