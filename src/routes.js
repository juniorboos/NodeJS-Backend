const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ParkingController = require('./controllers/ParkingController');
const RegionController = require('./controllers/RegionController');
const SpotController = require('./controllers/SpotController');
const cookieParser  = require("cookie-parser")
const authMiddleware = require('./middleware/auth')
require('dotenv/config')
const routes = express.Router();
const admins = require('./services/Admins.json')

routes.post("/authenticate", async (req, res) => {
   try {
      const { email, password } = req.body;

      const userEmail = email
      const user = admins.find( ({ email }) => email === userEmail)
      console.log(user)
      if (!user) {
         return res.status(400).json({ error: "User not found" });
      }
      if (!(await bcrypt.compare(password, user.password))) {
         return res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 86400 })
      res.cookie('token', token, { httpOnly : true})

      res.json({
         user,
         token
      })

      return res
   } catch (err) {
      console.log(err)
      return res.status(400).json({ error: "User authentication failed" });
   }
});

routes.use(authMiddleware)

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