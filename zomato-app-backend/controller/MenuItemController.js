const MenuItemModel = require('../model/MenuItemModel');
const MenuItemController = {
    getMenuItemList: async(requrest,response)=>{
        let {mi_id} = requrest.params;
        let result = await MenuItemModel.find({restaurantId:mi_id});
        response.send({
            call: true,
            result
        });
    },
};


module.exports = MenuItemController;