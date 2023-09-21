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

    useEffect(() =>{
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
                
                if(!spot.avgRating) spot.avgRating="New"
             return(
                    <div key={spot.id} className="spot-div">
                        <NavLink className="navlink-image" to={`/spots/${spot.id}`}>
                        <div id="img-text">
                        <img style={{width:"300px",height:"220px", borderRadius:"0.8rem"}} src={spot.previewImage} alt={spot.name}  />
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
