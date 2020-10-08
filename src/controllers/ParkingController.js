const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      console.log('Procurando parkings...')
      const snapshot = await parkingsRef.get();
      if(snapshot.empty) {
         response = {error:'Empty collection'};
         console.log(response);
         return response;
      }

      const parkingsList = []
      snapshot.forEach(doc => {
         parkingsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Parkings: ", parkingsList)
      
      const parkings = {
         data: parkingsList
      }
      return response.json(parkings);
   },

   async create(request, response) {
      const { id, name, coordinates, image } = request.body;

      await parkingsRef.doc(id).set({
         name,
         coordinates,
         image
      })
      return response.json({ message: "Success" });
   }
}