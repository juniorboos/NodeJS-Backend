const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      console.log('Procurando parkings...')
      const snapshot = await parkingsRef.get();
      if(snapshot.empty) {
         return response.json({error:'Empty collection'});
      }

      const parkingsList = []
      snapshot.forEach(doc => {
         parkingsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Parkings: ", parkingsList)
      
      return response.json(parkingsList);
   },

   async create(request, response) {
      const { id, name, coordinates, image } = request.body;

      await parkingsRef.doc(id).set({
         name,
         coordinates,
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