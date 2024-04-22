const MealTypeModel = require('../model/MealTypeModel');

const MealTypeController = {
    getMealTypeList: async(request,response)=>{        
        let result = await MealTypeModel.find();        
        response.send({
            status:true,
            result,
            length: result.length,
        });
    },
};

module.exports = MealTypeController;