const Approuting = require('express').Router();
const UserController = require('../controller/UserController');
const LocationController = require('../controller/LocationController');
const RestaurantController = require('../controller/RestaurantController');
const MealTypeController = require('../controller/MealTypeController');
const MenuItemController = require('../controller/MenuItemController');
const PaymentController = require('../controller/PaymentController');
Approuting.post('/login',UserController.userLogin);
Approuting.post('/user-detail-saver',UserController.userDetailsSaver);
Approuting.post('/filter',RestaurantController.filter);
Approuting.post('/create-order',PaymentController.createOrder);
Approuting.post('/veryfy-payment',PaymentController.veryfyPayment);

Approuting.get('/get-location-list',LocationController.getLocationList);
Approuting.get('/get-restaurant-list-by-loc-id/:loc',RestaurantController.getRestaurantListByLocId);
Approuting.get('/get-single-restaurant-details/:rest_id',RestaurantController.getSingleRestaurantDetails);
Approuting.get('/get-meal-type-list',MealTypeController.getMealTypeList);
Approuting.get('/get-menu-item-list/:mi_id',MenuItemController.getMenuItemList);

module.exports = Approuting;