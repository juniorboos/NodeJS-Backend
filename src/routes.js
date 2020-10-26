const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ParkingController = require('./controllers/ParkingController');
const RegionController = require('./controllers/RegionController');
const SpotController = require('./controllers/SpotController');
const cookieParser = require("cookie-parser")
const authMiddleware = require('./middleware/auth')
const { verify } = require("jsonwebtoken")
require('dotenv/config')
const routes = express.Router();
const admins = require('./services/Admins.json')

routes.post("/authenticate", async (req, res) => {
   try {
      const { email, password } = req.body;

      const userEmail = email
      const user = admins.find(({ email }) => email === userEmail)
      console.log(user)
      if (!user) {
         return res.status(400).json({ error: "User not found" });
      }
      if (!(await bcrypt.compare(password, user.password))) {
         return res.status(400).json({ error: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' })

      const refreshedToken = jwt.sign(
         { id: user.id },
         process.env.REFRESH_TOKEN_SECRET,
         {
            expiresIn: "24h"
         }
      );

      res.cookie("token", refreshedToken, {
         httpOnly: true,
         path: "/refresh_token"
      });

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

routes.post("/refresh_token", async (req, res) => {
   const token = req.cookies.token
   if (!token) {
      return res.send({ ok: false, accessToken: "" })
   }

   let payload = null
   try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
   } catch (err) {
      console.log(err.name)
      return res.send({ ok: false, accessToken: "" })
   }

   //token is valid

   const user = admins.find(({ id }) => id === payload.id)

   if (!user) {
      return res.send({ ok: false, accessToken: "" })
   }

   const refreshedToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: "24h"
      }
   );

   res.cookie("token", refreshedToken, {
      httpOnly: true,
      path: "/refresh_token"
   });

   const newToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '6h' }
   )

   return res.send({ ok: true, user: user, accessToken: newToken})

})

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