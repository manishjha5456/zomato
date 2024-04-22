const LocationModel = require('../model/LocationModel');
const LocationController = {
    getLocationList: async (request,response)=>{
        let result = await LocationModel.find();
        response.send({
            status:true,
            LocationList: result
        });
    }
};

module.exports = LocationController;