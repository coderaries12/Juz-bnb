import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CurrentUserBookingList.css'
import { NavLink,useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkloadbookings } from "../../store/booking";
import PostReview from "../PostReview"
import OpenModalButton from '../OpenModalButton/index'
import { thunkloadspots } from "../../store/spot";
import { thunkloadcurrentuserreviews } from "../../store/review";
import PastBooking from "./PastBooking";

export default function CurrentUserBookingList(){
    const history= useHistory()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const sessioUser = useSelector(state => state?.session?.user)
    const allBookings = Object.values(useSelector(state => state?.bookings?.allBookings))
    //let userSpotReview = Object.values(useSelector((state) => state?.reviews.allCurrentUserReviews))
    
    
    useEffect(() =>{

        dispatch(thunkloadbookings()).then(() => {
            setLoading(false)})
    },[dispatch])
    useEffect(() =>{

        dispatch(thunkloadcurrentuserreviews())
    },[dispatch])
    
    if(loading)   return <div>Loading...</div>
   
    let currentDate = new Date(new Date().setHours(0, 0, 0, 0))
    let BookingsFuture = allBookings
        .filter(booking => {
            let date = new Date(booking.startDate)
            return date >= currentDate
        })
        .sort((a, b) => {
            let aStart = new Date(a.startDate)
            let bStart = new Date(b.startDate)
            return aStart - bStart
        })

   

    let BookingsPast = allBookings
        .filter(booking => {
            let endDate = new Date(booking.endDate);
            return endDate < currentDate;
        })
        .sort((a, b) => {
            let aStart = new Date(a.startDate);
            let bStart = new Date(b.startDate);
            return bStart - aStart;
        });

        function formatDate(dateString) {
            const date= new Date(dateString).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",  
          })
          return date;
        }
        


    return(
        
        <div className="booking-div" style={{minHeight:"100vh", marginLeft:"2rem"}}>
            <h1>Trips</h1>
            <div className="upcoming-trip-div">
                
                {BookingsFuture.length < 1 && (
                    <div style={{borderBottom:"2px solid lightgray", marginBottom:"2rem"}}>
                        <div style={{fontSize:"22px",fontWeight:"400", lineHeight:"26px", marginTop:"2rem"}}>No trips booked...yet!</div>
                        <p style={{fontSize:"18px",fontWeight:"400", lineHeight:"24px", marginTop:"1.5rem"}}>Time to dust off your bags and start planning your next adventure</p>
                        <button className="start-searching"
                            onClick={() => {
                                history.push('/')
                            }}
                        >Start searching</button>
                    </div>)}
                <h2> Upcoming Trips</h2>
                <div style={{display:"flex",flexDirection:"row", gap:"8rem"}} >
                {BookingsFuture.map(booking => {
                    return (
                    <div >
                        
                        <NavLink to={`/spots/${booking.Spot?.id}`} style={{textDecoration:"none", color:"black", fontSize:"18px"}}>
                            <img src={booking.Spot?.previewImage} alt="spot" style={{borderRadius:"0.8rem", height:"200px", width:"300px"}} />
                            <p style={{marginTop:"0.8rem"}}>{booking.Spot?.name}</p>
                            <p style={{color:"darkgray", marginTop:"0.4rem"}}>
                                {formatDate(booking.startDate)} to{" "}
                                {formatDate(booking.endDate)}
                            </p>
                        </NavLink>
                        <div style={{display:"flex",flexDirection:"row", gap:"0.5rem"}}>
                        <div>
                            <OpenModalButton 
                                    buttonText="Delete Booking" 
                            /> 
                        </div>
                        <div>
                            <OpenModalButton 
                                    buttonText="Edit Booking" 
                            /> 
                        </div>

                        </div>
                        
                       
                    </div>
                    )

                })}
            </div>
            </div>
            <div style={{marginTop:"2rem"}}>
                {allBookings.length > 0 && BookingsPast.length > 0 && (<h2 >Where you've been</h2>)}
                <div style={{display:"flex",flexDirection:"row",gap:"5rem"}}>
                    {BookingsPast.map(booking => {
                        return (
                            <div key={booking.id}>
                            <PastBooking booking={booking} />

                        </div>)
                    })}
                </div>
            </div>
        
        </div>
    )

}
