const express = require('express');

const ParkingController = require('./controllers/ParkingController');
// const DeviceController = require('./controllers/DeviceController');

const routes = express.Router();

// routes.post('/sessions', SessionController.create);

// routes.get('/ongs', OngController.index);
// routes.post('/ongs', OngController.create);

// routes.get('/profile', ProfileController.index);

// routes.get('/incidents', IncidentController.index);
// routes.post('/incidents', IncidentController.create);
// routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/parkings', ParkingController.index)
routes.post('/parkings', ParkingController.create)


module.exports = routes;