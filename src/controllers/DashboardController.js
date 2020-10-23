const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      const { name } = request.body;  

      const { parkingId } = request.params;

      return response.json(parkingsList);
   },

   async create(request, response) {
      
      return response.json({ message: "Success" });
   },

   async update(request, response) {
     
      return response.json({ message: "Success" });
   },

   async delete(request, response) {
      
      return response.json({ message: "Success" });
   }
}