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
             return(
                
               
                    
                    <div className="spot-div">
                        <NavLink to={`/spots/${spot.id}`}>
                        <div className="img-text">
                        <img src={spot.previewImage} alt={spot.name} height={300} width={300}   />
                        </div>
                        </NavLink>
                        
                        <div className="city-state-rating-div">
                            <p>{spot.city}, {spot.state}</p>
                            <p>★{spot.avgRating}</p>
                        </div>
                        <div><p>${spot.price} night</p></div>
                        
                        
                    </div>

                
             )
            })
        }
        </div>
    )

}
