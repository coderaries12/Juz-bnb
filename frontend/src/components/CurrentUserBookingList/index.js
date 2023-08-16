import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CurrentUserBookingList.css'
import { NavLink,useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkloadbookings } from "../../store/booking";
import PostReview from "../PostReview"
import OpenModalButton from '../OpenModalButton/index'
import { thunkloadspots } from "../../store/spot";
import { thunkloadcurrentuserreviews } from "../../store/review";

export default function CurrentUserBookingList(){
    const history= useHistory()
    const dispatch = useDispatch()
    // let bookingspotreview
    //let userSpotReview = Object.values(useSelector((state) => state?.reviews?.allCurrentUserReviews))
    
    const allBookings = Object.values(useSelector(state => state?.bookings?.allBookings))
    //console.log("all current user reviews", userSpotReview)
    
    
    useEffect(() =>{

        dispatch(thunkloadbookings())
        dispatch(thunkloadspots()).then(dispatch(thunkloadcurrentuserreviews()))
        

    },[dispatch])
    // useEffect(() =>{

        
    //     dispatch(thunkloadspots()).then(dispatch(thunkloadcurrentuserreviews()))

    // },[dispatch])


    if(allBookings === {}) return <></>
    if(allBookings === null || allBookings === undefined) return <></>
   
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

    console.log("future bookings", BookingsFuture)

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
            // const date = new Date(dateString);
            // const day = (date.getDate() + 1).toString();
            // const month = (date.getMonth() + 1).toString();
            // const year = date.getFullYear().toString();
            // return `${month}/${day}/${year}`;
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
                {BookingsFuture.map(booking => {
                    return (
                    <div>
                        <h2> Upcoming Trips</h2>
                        <NavLink to={`/spots/${booking.Spot?.id}`}>
                            <img src={booking.Spot?.previewImage} alt="spot" />
                            <p>{booking.Spot?.name}</p>
                            <p>
                                {formatDate(booking.startDate)} to{" "}
                                {formatDate(booking.endDate)}
                            </p>
                        </NavLink>
                       
                    </div>)

                })}
            </div>
            <div className="past-trip-div">
                {allBookings.length > 0 && BookingsPast.length > 0 && (<h2 >Where you've been</h2>)}
                <div>
                    {BookingsPast.map(booking => {
                        return (
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
                        {/* { userSpotReview=userSpotReview.filter((review) => review.spotId === booking.spotId)}
                        {console.log("review length", userSpotReview)}
                        {!userSpotReview.length && (<div >

                            <OpenModalButton buttonText="Post your Review"
                                modalComponent={<PostReview spotId={booking.Spot.id} spot={booking.Spot} />}
                                style={{ fontSize: '10px', height: '1.5rem', borderRadius: '6px' }}
                            />
                            </div>)}  */}

                        </div>)
                    })}
                </div>
            </div>
        
        </div>
    )

}
