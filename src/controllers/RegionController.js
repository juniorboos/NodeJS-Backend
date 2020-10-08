const admin = require('../services/firebase')
const parkingsRef = admin.firestore().collection('Parkings');

module.exports = {
   
   async index(request, response) {
      const { id } = request.params;

      console.log('Procurando regiões...')
      const snapshot = await parkingsRef.doc(id).collection('Regions').get();
      if(snapshot.empty) {
         return response.json({error:'Empty collection'});
      }

      const regionsList = []
      snapshot.forEach(doc => {
         regionsList.push({id: doc.id, ... doc.data()})
      })

      console.log("Regions: ", regionsList)
      
      const regions = {
         data: regionsList
      }
      return response.json(regions);
   },

   async create(request, response) {
      const { id } = request.params;
      const { name } = request.body;

      await parkingsRef.doc(id).collection('Regions').doc(name).set({
         name
      })
      return response.json({ message: "Success" });
   }
}