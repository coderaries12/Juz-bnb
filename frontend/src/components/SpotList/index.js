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
    console.log("Spots in spotList component",spots)
    
    useEffect(() =>{
    dispatch(thunkloadspots())

    },[dispatch])
    if(!spots) return null;

    return(
        <div className="card-spot">
        {
            spots.map((spot) => {
                // if(!(Number.parseFloat(spots.avgRating).toFixed(2))) spot.avgRating="New"
                if(!spot.avgRating) spot.avgRating="New"
             return(
                    <div className="spot-div">
                        <NavLink to={`/spots/${spot.id}`}>
                        <div class="tooltip">
                        <span class="tooltiptext">{spot.name}</span>
                        </div> 
                        <div className="img-text">
                        <img src={spot.previewImage} alt={spot.name} height={220} width={220}   />
                        </div>
                        </NavLink>
                        
                        <div className="city-state-rating-div">
                            <div className="spot-city-state">{spot.city}, {spot.state}</div>
                            <div className="spot-avrRating">★{spot.avgRating}</div>
                        </div>
                        <div className="spot-price"><p>${spot.price} night</p></div>
                        
                        
                    </div>

                
             )
            })
        }
        </div>
    )

}
