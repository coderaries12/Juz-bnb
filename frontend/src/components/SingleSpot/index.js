import React from "react";
import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { thunkloadreviews } from "../../store/review";
import OpenModalButton from '../OpenModalButton/index'
import DeleteReview from "../DeleteReview";
import PostReview from "../PostReview";
import CurrentUserBookingList from "../CurrentUserBookingList";
import { useModal } from "../../context/Modal";
import LoginFormModal from '../LoginFormModal';
import ReserveSpotModal from "../ReserveSpotModal"; 

import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    const user = useSelector(state => state.session.user);
    const spot=useSelector(state => state?.spots?.singleSpot)
    const reviewsObj = useSelector((state) => state?.reviews?.allReviews)
    let reviews;
    if (reviewsObj) reviews = Object.values(reviewsObj)
    const sortedReviews = reviews?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const SpotUser = useSelector(state => state?.spots.singleSpot.Owner)
    const currentUser = useSelector(state => state.session.user)
    let reviewsLength = reviews?.length 

    const [startDate, setStartDate] = useState(new Date());
    const initialEndDate = startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null;
    const [endDate, setEndDate] = useState(initialEndDate);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { setModalContent } = useModal();
    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"

        setErrors(errors);

    }, [startDate, endDate])

    

    let months = {
        "01": "January",
        "02": "Feburary",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    
    
   
    useEffect(() =>{
    dispatch(thunkloadsinglespot(spotId))
    dispatch(thunkloadreviews(spotId))

    },[dispatch])

    function handleCheckInDate(date) {
        setStartDate(date);
      }
    
      function handleCheckOutDate(date) {
        setEndDate(date);
      }
    

    
    if(!reviewsObj)  return <div>Loading ...</div>

    // alert function
    const handlealert = async (e) => {
        e.preventDefault();
        setSubmitted(true);
    
        const newBooking = {
          startDate,
          endDate,
        };
    
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (startDate < today) {
          setErrors("You cannot book a spot in the past.");
          return;
        }
        if (Object.values(errors).length) return;

    dispatch(CurrentUserBookingList(spotId, newBooking))
      .then(() => {
        setModalContent(
          <div className="reserved-modal">
            <h2>Reservation booked!</h2>
            <p>To manage your booked getaways head to the user profile.</p>
          </div>
        );
      })
    }

    let sum = 0;
    for(let r of reviews){
        sum+=r.stars
    }
    let AvgRating = sum/reviews.length
    
    if(!spot?.id ) return null;
    if(!SpotUser.id)   return null
   

    const CurrentUserReview = reviews.find(r => r.userId === currentUser?.id )
    
    const reviewNum = (num) => {
        if (num === 0) return "★ New"
        else if (num === 1) return " . 1 review"
        else if(num > 1) return `. ${num} reviews`
    }
    
    return (
        <div style={{marginLeft:"7rem"}}>
            <div><h2 id="spot-name">{spot.name}</h2></div>
            <div style={{marginBottom:"1rem"}}><p>{spot.city}, {spot.state}, {spot.country}</p></div>
            <div className="spot-images-div"> 
                <div className="preview-image-on-the-left"><img style={{borderRadius:"0.8rem", width: "600px"}} src={spot.SpotImages[0].url} alt="spot-Images" height={410} />
            </div>
            <div className="image-array-for-right-side">
                <img style={{borderRadius:"0.8rem", height:"200px", width:"300px"}}  src={spot.SpotImages[1]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="Image is coming soon" placeholder="Image coming soon"/>
                <img style={{borderRadius:"0.8rem", height:"200px", width:"300px"}} src={spot.SpotImages[2]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg" } alt="spot-Images"  />
                <img style={{borderRadius:"0.8rem", height:"200px", width:"300px"}} src={spot.SpotImages[3]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="spot-Images"  />
                <img style={{borderRadius:"0.8rem", height:"200px", width:"300px"}} src={spot.SpotImages[4]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="spot-Images"  />    
            </div>
        </div>

        <div className="text-div">
            <div className="h2-spot-description">
                <h2 className="spot-user-heading">Hosted by {SpotUser.firstName} {SpotUser.lastName}</h2>
                <p>{spot.description}</p>
            </div>
        {/* Reserve Button for logged-in user     */}
       <div className="call-out-box">    
            <div className="spot-night">
                <span> ${spot.price} night  </span>
                {!AvgRating ? <div className="new">
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <h4 >New</h4>
                </div> : 
                ( <div><span> ★ {Number.parseFloat(AvgRating).toFixed(1)}  </span>   
                <span> {reviewNum(reviewsLength)} </span></div> )}
            </div>               
                
                {/* <button className="reserve-button" onClick={handlealert}>Reserve</button>     */}
                <div className="reserve-div">
                { user ? (
                                    <OpenModalButton
                                        buttonText="Reserve"
                                        modalComponent={<ReserveSpotModal spot={spot} />}
                                    />
                                ) : (

                                    <OpenModalButton
                                        buttonText="Reserve"
                                        modalComponent={<LoginFormModal />}
                                    />

                                )
                  }
              </div>
                
                      
            </div>
        </div>
        
        <div className="down-rating-div">
            {!AvgRating ? <div className="new">
            <i class="fa-sharp fa-solid fa-star"></i>
            <h4>New</h4>
            </div> : 
            (<div><span>★ {Number.parseFloat(AvgRating).toFixed(1)} </span>
            <span>{reviewNum(reviewsLength)} </span></div> )}
            
        </div>
        
            {
                    (currentUser && (currentUser.id !== SpotUser.id) && (!CurrentUserReview)) && 
                    <div>
                        <OpenModalButton 
                             buttonText="Post Your Review" modalComponent={<PostReview  spotId={spotId} spot={spot} />} 
                    /> 
                    </div>      
            }
            {
                !reviews.length && currentUser.id !== SpotUser.id ?
                (<div>
                    <p>Be the first to post a review</p>
                </div>) : <></>
            }
        
        
        <div className="reviewslist-div">
            <div>
               {
                sortedReviews.map((r)=>{
                return(
                <div className="reviews-info-div">
                 
                  
                  <h3> {r.User.firstName} {r.User.lastName} </h3>
                  <p className="review-date">{months[r.createdAt.slice(5,7)]} {r.createdAt.slice(0,4)}</p>
                  <p> {r.review} </p>
                { currentUser && (r.userId === currentUser?.id) &&
                  
                  <div>
                    <OpenModalButton 
                             buttonText="Delete" modalComponent={<DeleteReview reviewId={r.id} spotId={spotId} />} 
                    /> 
                  </div>
                }
                
                 </div>
                )
                })
               } 
            </div>
       
        </div>
    </div>
    )
}
