import React from "react";
import { useEffect } from "react";
import { thunkcurrentuserspot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './currentuserspotlist.css'
import { NavLink,useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import DeleteSpot from "../DeleteSpot";
import OpenModalButton from '../OpenModalButton/index'

export default function CurrentUserSpotList(){
    const history= useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state?.session.user)
    const spotobj = useSelector((state) => state?.spots.allSpots)
    const spots = Object.values(spotobj)
    // const {OpenModalButton} = useModal()
    // let CurrentUserSpotList=[];
    // for(let spot of spots){
    //     if(spot.ownerId===currentUserId){
    //         CurrentUserSpotList.push(spot)
    //     }
    // }
    
    
    useEffect(() =>{
    //if(currentUser){
        dispatch(thunkcurrentuserspot())

    

    },[dispatch])
   
    if(spots.length === 0) {
        return(
            <button onClick={()=>  history.push('/spots/new') }> Create a new spot
               
            </button>
        )
        
    }

    return(
        
        <div className="card-spot">
            <h1 id="manage-spot-heading">Manage Spots</h1>
        {
            spots.map((spot) => {
                // if(!(Number.parseFloat(spots.avgRating).toFixed(2))) spot.avgRating="New"
                if(!spot.avgRating) spot.avgRating="New"
             return(
                    <div key={spot.id} className="spot-div">
                        <NavLink className="navlink-image" to={`/spots/${spot.id}`}>
                        {/* <div class="tooltip">
                        <span class="tooltiptext">{spot.name}</span>
                        </div>  */}
                        <div id="img-text">
                        <img src={spot.previewImage} alt={spot.name} height={220} />
                        </div>
                        </NavLink>
                        
                        <div className="city-state-rating-div">
                            <div className="spot-city-state">{spot.city}, {spot.state}</div>
                            <div className="spot-avrRating">★{spot.avgRating}</div>
                        </div>
                        <div className="spot-price"><p>${spot.price} night</p></div>
                        <div className="current-user-spot-button">
                            <button  className="update-button" onClick={()=> history.push(`/spots/${spot.id}/edit`)}>Update</button>
                             {/* <button  onClick={()=> history.push(`/spots/${spot.id}/delete`)}>Delete</button>  */}
                             <OpenModalButton 
                             buttonText="Delete" id="delete-button" modalComponent={<DeleteSpot spotId={spot.id} />} 
                             /> 
                        </div>
                        

                        
                        
                    </div>

                
             )
            })
        }
        </div>
    )

}
