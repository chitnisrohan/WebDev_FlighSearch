module.exports = function (app) {

    var model = require("./model/model.server.js")();

    require('./services/user.service.server.js')(app, model);
    require('./services/message.service.server.js')(app, model);
    require('./services/hotel.service.server.js')(app, model);
    require('./services/flight.service.server.js')(app, model);

};