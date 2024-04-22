const { response } = require('express');
const RestaurantModel = require('../model/RestaurantModel');

const RestaurantController = {
    getRestaurantListByLocId: async(request,response)=>{
        let {loc}= request.params;
        let result = await RestaurantModel.find({location_id:loc});        
        response.send({
            status:true,
            result
        });
    },
    getSingleRestaurantDetails: async(request,response)=>{
        let {rest_id} = request.params
        let result = await RestaurantModel.findOne({_id:rest_id});        
        response.send({
            status:true,
            result
        });
    },
    
    filter: async(request,response)=>{
        let {meal_type, sort, location} = request.body;
        let filterData = {};
        //let sort = 1;
        if(meal_type !== undefined) filterData['mealtype_id'] = meal_type;
        if(location !== undefined) filterData['location_id'] = location;
        // console.log(filterData);
        let result = await RestaurantModel.find(filterData).sort({ min_price: sort});  
        response.send({
            status:true,
            result
        });
    },
};

module.exports = RestaurantController;