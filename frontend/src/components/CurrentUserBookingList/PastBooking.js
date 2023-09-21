import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkloadcurrentuserreviews } from "../../store/review";
import { NavLink,useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton/index'
import PostReview from "../PostReview"
import { thunkloadreviews } from "../../store/review";
import { thunkloadspots } from "../../store/spot";
import './CurrentUserBookingList.css'

export default function PastBooking({booking}){
    const history= useHistory()
    const dispatch = useDispatch()
    useEffect(() =>{
    dispatch(thunkloadcurrentuserreviews())
        },[dispatch])
    //let userSpotReview = Object.values(useSelector((state) => state?.reviews.allCurrentUserReviews))
    
    function formatDate(dateString) {
            const date= new Date(dateString).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",  
          })
          return date;
        } 
    // let bookingReview
    //     bookingReview=userSpotReview?.filter((review) => review.spotId === booking.spotId)       
    return(
        <div style={{display:"flex"}}>
                           <NavLink to={`/spots/${booking.Spot?.id}`} style={{textDecoration:"none", color:"black", fontSize:"18px"}}>
                                <div>
                                <img style={{borderRadius:"0.8rem", height:"200px", width:"300px"}} src={booking.Spot?.previewImage} alt="spot"  />
                                </div>
                                <div>
                                <div style={{marginTop:"0.8rem"}}>{booking.Spot?.name}</div>
                                <div style={{color:"darkgray", marginTop:"0.4rem"}}>
                                    {formatDate(booking.startDate)} to{" "}
                                    {formatDate(booking.endDate)}
                                </div>
                                </div>
                        </NavLink> 
                        
                        
                        {/* { !bookingReview?.length && (<div >

                            <OpenModalButton buttonText="Post your Review"
                                modalComponent={<PostReview spotId={booking.Spot.id} spot={booking.Spot} />}
                                style={{ fontSize: '10px', height: '1.5rem', borderRadius: '6px' }}
                            />
                            </div>)}   */}

                        </div>) 
    
    
}
