import React from "react";
import { useEffect } from "react";
import { thunkcurrentuserspot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './currentuserspotlist.css'
import { NavLink,useHistory } from "react-router-dom";

export default function CurrentUserSpotList(){
    const history= useHistory()
    const dispatch = useDispatch()
   // const currentUserId = useSelector((state) => state?.session.user)
    const spotobj = useSelector((state) => state?.spots.allSpots)
    const spots = Object.values(spotobj)
    // let CurrentUserSpotList=[];
    // for(let spot of spots){
    //     if(spot.ownerId===currentUserId){
    //         CurrentUserSpotList.push(spot)
    //     }
    // }
    
    //console.log("id of current user",currentUserId)
    console.log("Inside the current user component",spotobj)
    
    useEffect(() =>{
    dispatch(thunkcurrentuserspot())

    },[dispatch])
    //if(!spots.id)  return null;
    if(spots.length === 0) {
        return(
            <button onClick={()=>  history.push('/spots/new') }> Create a new spot
               
            </button>
        )
        
    }

    return(
        
        <div className="card-spot">
            <div><h1>Manage Spots</h1></div>
        {
            spots.map((spot) => {
                // if(!(Number.parseFloat(spots.avgRating).toFixed(2))) spot.avgRating="New"
                if(!spot.avgRating) spot.avgRating="New"
             return(
                    <div key={spot.id} className="spot-div">
                        <NavLink  to={`/spots/${spot.id}`}>
                        {/* <div class="tooltip">
                        <span class="tooltiptext">{spot.name}</span>
                        </div>  */}
                        <div className="img-text">
                        <img src={spot.previewImage} alt={spot.name} height={220} width={220}   />
                        </div>
                        </NavLink>
                        
                        <div className="city-state-rating-div">
                            <div className="spot-city-state">{spot.city}, {spot.state}</div>
                            <div className="spot-avrRating">★{spot.avgRating}</div>
                        </div>
                        <div className="spot-price"><p>${spot.price} night</p></div>
                        <div className="current-user-spot-button">
                            <button  className="update-button" onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                            <button  onClick={()=> history.push(`/spots/${spot.id}/delete`)}>Delete</button>
                        </div>
                        

                        
                        
                    </div>

                
             )
            })
        }
        </div>
    )

}
