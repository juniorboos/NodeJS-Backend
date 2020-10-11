const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      const { parkingId } = request.params;

      console.log('Procurando regiões...')
      const snapshot = await parkingsRef.doc(parkingId).collection('Regions').get();
      

      const regionsList = []
      snapshot.forEach(doc => {
         regionsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Regions: ", regionsList)
      
      return response.json(regionsList);
   },

   async create(request, response) {
      const { parkingId } = request.params;
      const { name } = request.body;

      await parkingsRef.doc(parkingId).collection('Regions').doc(name).set({
         name
      })
      return response.json({ message: "Success" });
   },

   async delete(request, response) {
      const { parkingId, regionId } = request.params;

      await parkingsRef.doc(parkingId).collection('Regions').doc(regionId).delete()
      return response.json({ message: "Success" });
   }
}