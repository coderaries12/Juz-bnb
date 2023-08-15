import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CurrentUserBookingList.css'
import { NavLink,useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkloadbookings } from "../../store/booking";

import OpenModalButton from '../OpenModalButton/index'

export default function CurrentUserBookingList(){
    const history= useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state?.session.user)
    const spotobj = useSelector((state) => state?.spots.allSpots)
    const spots = Object.values(spotobj)
   
    
    useEffect(() =>{

        dispatch(thunkloadbookings())

    },[dispatch])
   
    // if(spots.length === 0) {
    //     return(
    //         <button onClick={()=>  history.push('/spots/new') }> Create a new spot
               
    //         </button>
    //     )
        
    // }

    return(
        
        <div className="card-spot" style={{minHeight:"100vh"}}>
            <h1 id="manage-spot-heading">Trips</h1>

        
        </div>
    )

}
