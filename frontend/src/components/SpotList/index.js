import React from "react";
import { useEffect } from "react";
import { thunkloadspots } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './spotlist.css'
import { NavLink } from "react-router-dom";


export default function SpotList(){
    const dispatch = useDispatch()
    const spotsObj = useSelector((state) => state?.spots.allSpots)
    
    const spots = Object.values(spotsObj)
    
    useEffect(() =>{
    dispatch(thunkloadspots())
    },[dispatch])

    if(!spots) return null;

    return(
        <div className="card-spot">
            {
            spots.map((spot) => {
                
             return(
                <div className="spot-div">
                    {
                            
                    }
                    <NavLink id="navlink-text" to={`/spots/${spot.id}`}>
                        
                    <div className="img-text">
                        <p class="tooltip">{spot.name}</p> 
                        <img className="land-page-images" src={spot.previewImage} alt={spot.name} height={240} width={240}   />
                        
                    </div>
                    <div className="city-state-rating-div">
                            <div className="spot-city-state">{spot.city}, {spot.state}</div>
                            <div className="spot-avrRating">{!spot.avgRating ? "★ New" : <span>★ {Number.parseFloat(spot.avgRating).toFixed(1)}</span>}</div>
                    </div>
                   <div className="spot-price-night"><div className="spot-price" >${spot.price}  </div><div>night</div></div>
                                
                    </NavLink>
                        
                    
                </div>
  
             )
            })
            }
        </div>
    )

}
