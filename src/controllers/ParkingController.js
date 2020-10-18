const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      console.log('Procurando parkings...')
      const snapshot = await parkingsRef.get();
      

      const parkingsList = []
      snapshot.forEach(doc => {
         parkingsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Parkings: ", parkingsList)
      
      return response.json(parkingsList);
   },

   async create(request, response) {
      const { 
         name,
         maxDuration,
         vehiclesAllowed,
         totalSpots,
         coordinates,
         address,
         description,
         image } = request.body;

      await parkingsRef.add({
         name,
         maxDuration,
         vehiclesAllowed,
         totalSpots,
         coordinates,
         address,
         description,
         image
      })
      return response.json({ message: "Success" });
   },

   async update(request, response) {
      const {
         id, 
         name,
         maxDuration,
         vehiclesAllowed,
         totalSpots,
         coordinates,
         address,
         description,
         image } = request.body;

      await parkingsRef.doc(id).set({
         name,
         maxDuration,
         vehiclesAllowed,
         totalSpots,
         coordinates,
         address,
         description,
         image
      })
      return response.json({ message: "Success" });
   },

   async delete(request, response) {
      const { parkingId } = request.params;

      await parkingsRef.doc(parkingId).delete()
      return response.json({ message: "Success" });
   }
}