const express = require('express');

const ParkingController = require('./controllers/ParkingController');
const RegionController = require('./controllers/RegionController');
const SpotController = require('./controllers/SpotController');
// const DeviceController = require('./controllers/DeviceController');

const routes = express.Router();

// routes.post('/sessions', SessionController.create);

// routes.get('/ongs', OngController.index);
// routes.post('/ongs', OngController.create);

// routes.get('/profile', ProfileController.index);

// routes.get('/incidents', IncidentController.index);
// routes.post('/incidents', IncidentController.create);
// routes.delete('/incidents/:id', IncidentController.delete);


// Parkings
routes.get('/parkings', ParkingController.index)
routes.post('/parkings', ParkingController.create)
routes.put('/parkings', ParkingController.update)
routes.delete('/parkings/:parkingId', ParkingController.delete)

// Regions
routes.get('/parkings/:parkingId', RegionController.index)
routes.post('/parkings/:parkingId', RegionController.create)
routes.put('/parkings/:parkingId', RegionController.update)
routes.delete('/parkings/:parkingId/:regionId', RegionController.delete)

// Spots
routes.get('/parkings/:parkingId/:regionId', SpotController.index)
routes.post('/parkings/:parkingId/:regionId', SpotController.create)
routes.delete('/parkings/:parkingId/:regionId/:spotId', SpotController.delete)

module.exports = routes;