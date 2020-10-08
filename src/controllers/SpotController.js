const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      const { parkingId, regionId } = request.params;

      console.log('Procurando spots...')
      const snapshot = await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').get();
      if(snapshot.empty) {
         return response.json({error:'Empty collection'});
      }

      const spotsList = []
      snapshot.forEach(doc => {
         spotsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Spots: ", spotsList)
      
      const spots = {
         data: spotsList
      }
      return response.json(spots);
   },

   async create(request, response) {
      const { parkingId, regionId } = request.params;
      const { id, coordinates } = request.body;

      await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').doc(id).set({
         coordinates
      })
      return response.json({ message: "Success" });
   },

   async delete(request, response) {
      const { parkingId, regionId, spotId } = request.params;

      await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).collection('Spots').doc(spotId).delete()
      return response.json({ message: "Success" });
   }
}