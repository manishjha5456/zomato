import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimg from '../images/sclogo.png'
function Home(){
    let navigate = useNavigate();
    let initData = {
      city:"",
      city_id:0,
      country_name:"",
      location_id:0,
      name:""
    }
    let [locations,setLocations] = useState([])
    let [meals,setMeals] = useState([])
    let [hideLocations,setHideLocations] = useState(true)
    let [selectedLocation,setSelectedLocation] = useState({...initData})
    let [restaurantList,setRestaurantList] = useState({
        list:[],
        message: "0 restaurant Founds"
    })

    let selectedLocationGet = (id)=>{
      console.log(id);
      setSelectedLocation(locations[id]);
      setHideLocations((true))
    };

    let getMealTypeList = async ()=>{
        try {
            let url = "http://localhost:3040/get-meal-type-list";
            let response = await axios.get(url);
            let data = response.data
            setMeals(data.result);
        } catch (error) {
            alert('server Error');
            console.log(error);
        }
    };
    let getLocationList = async()=>{
      try {
        let url = "http://localhost:3040/get-location-list";
        let response = await axios.get(url);
        let data = response.data
        //setMeals(data.result);
        setLocations(data.LocationList);
        //console.log(data.LocationList);

    } catch (error) {
        alert('server Error');
        console.log(error);
    }
    };
    let getRestaurantListByLocationId = async ()=>{
      let url = 'http://localhost:3040/get-restaurant-list-by-loc-id/'+selectedLocation.location_id;
      let { data } = await axios.get(url);
      setRestaurantList({
        list:data.result,
        message:data.result.length+" restaurant Founds"
      });
    }
    useEffect(()=>{
        getMealTypeList();
        getLocationList();
    },[])

    useEffect(()=>{
      if(selectedLocation.location_id != 0){
        //console.log(selectedLocation);
        getRestaurantListByLocationId();
      }
    },[selectedLocation])
    return(<>
    <section className="row main-section align-content-start">
        <header className="col-12 py-3">
          <div className="container d-lg-flex justify-content-end d-none">
            <button className="btn text-white me-3">Login</button>
            <button className="btn btn-outline-light">
              Create an account
            </button>
          </div>
        </header>
        <section
          className="col-12 d-flex flex-column align-items-center justify-content-center">
          {/* <p role="button" className="brand-name fw-bold my-lg-2 mb-2">m</p> */}
          <div>
            <img className="border border-1 border-white" style={{borderRadius:'15px',marginTop:'70px'}} src={logoimg} width={'400px'} height={'100px'} alt="" />
          </div>
          <p className="h1 text-white my-3 text-center">
            Find the best restaurants, cafés, and bars
          </p>
          <div className="search w-50 gap-lg-2 d-flex align-items-start mt-3">
            <div id="location-input" className="w-75 position-relative mb-3">
              <input id="location-input" type="text" className="form-control mb-lg-0 w-100 me-lg-3 py-2 px-3"
              placeholder="Select a location"
              readOnly
              value={ selectedLocation.name === "" ? "" :`${selectedLocation.name}, ${selectedLocation.city}`} 
              onClick={()=>{setHideLocations(false)}}/>
              {
                hideLocations? null:(
                <ul className="list-group position-absolute w-100 top-100 z-index-100" >
                  {
                    locations.map((location,index)=>{
                    return (
                    <li key={location._id} className="list-group-item" onClick={()=>{selectedLocationGet(index)}}>{location.name}, {location.city}</li>)
                  },[])
                  }
                </ul>
              )}
            </div>
            <div className="w-100 position-relative mb-3 search-input">
              <div  className="input-group search-input">
                <span className="input-group-text bg-white">
                  <i className="fa fa-search text-primary"></i>
                </span>
                <input
                  type="text"
                  className="form-control py-2 px-3 "
                  placeholder={restaurantList.message}
                  onChange={()=>{}}
                  readOnly
                />
              </div>
              <ul className="list-group">
                  {
                    restaurantList.list.map((restaurant,index)=>{
                    return (
                    <li key={restaurant._id} className="list-group-item" 
                    onClick={()=>navigate('/restaurants-details/'+restaurant._id)}>
                      <img style={{width:'45px',height:'45px',borderRadius:'50px'}}
                      className=" me-2"
                       src={'/images/'+restaurant.image} alt="" />
                      <span>{restaurant.name}, {restaurant.city}</span>
                      </li>)
                  },[])
                  }
              </ul> 
            </div>
          </div>
        </section>
      </section>
      <section className="row justify-content-center">
        <section className="col-10 mt-3">
          <h3 className="fw-bold text-navy">Quick Searches</h3>
          <p className="text-secondary">Discover restaurants by Searches</p>
        </section>
        <section className="col-10">
          <section className="row py-2">
            <section
              className="col-12 px-0 d-flex justify-content-between flex-wrap" 
              >
                {
                  meals.map((meal)=>{
                    return(
                      <section key={meal._id} className="px-0 d-flex border border-1 quick-search-item" onClick={()=>navigate(`/search/${meal.meal_type}/${meal.name}`)}>
                        <img src={"/images/"+meal.image} alt="" className="image-item" />
                        <div className="pt-3 px-2">
                          <h4 className="text-navy">{meal.name}</h4>
                          <p className="small text-muted">
                            {meal.content}
                          </p>
                        </div>
                      </section>
                    );
                  })
                }
            </section>
          </section>
        </section>
      </section>
    </>);
}
export default Home;