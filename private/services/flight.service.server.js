module.exports = function (app, model, $http) {

    var API_KEY = process.env.FLIGHT_KEY;


    app.get('/api/getAPIKey',getAPIKEY);

    function getAPIKEY(req, res) {
        res.json(API_KEY);
    }



};