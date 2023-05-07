import React from "react";
import { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    const spotsObj = useSelector((state) => state?.spots.SingleSpot)
    const spots = Object.values(spotsObj)
    console.log("Spots in single spotList component",spots)
    
    useEffect(() =>{
    dispatch(thunkloadsinglespot(spotId))

    },[dispatch,spotId])
    if(!spots) return null;
    
    return(
        <div>
            <div>{spots.SingleSpot[spotId].name}</div>
            <div><p>{spots.SingleSpot[spotId].city}, {spots.SingleSpot[spotId].state}, {spots.SingleSpot[spotId].country}</p></div>
            <div>

            </div>
        </div>
    )
}
