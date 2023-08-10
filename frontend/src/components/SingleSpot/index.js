import React from "react";
import { useEffect } from "react";
import { useParams} from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { thunkloadreviews } from "../../store/review";
import OpenModalButton from '../OpenModalButton/index'
import DeleteReview from "../DeleteReview";
import PostReview from "../PostReview";
import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    const spot=useSelector(state => state?.spots.singleSpot)
    const reviewsObj = useSelector((state) => state?.reviews.allReviews)
    const reviews = Object.values(reviewsObj)
    const sortedReviews = reviews?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const SpotUser = useSelector(state => state?.spots.singleSpot.Owner)
    const currentUser = useSelector(state => state.session.user)
    let reviewsLength = reviews.length 
    

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

    

    // alert function
    function handlealert(){
        alert("Feature coming soon......")
    }
    let sum = 0;
    for(let r of reviews){
        sum+=r.stars
    }
    let AvgRating = sum/reviews.length
    
    if(!spot?.id ) return null;
    if(!SpotUser.id)   return null
   

    const CurrentUserReview = reviews.find(r => r.userId === currentUser.id )
    
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
                <div className="preview-image-on-the-left"><img  src={spot.SpotImages[0].url} alt="spot-Images" height={410} />
            </div>
            <div className="image-array-for-right-side">
                <img  src={spot.SpotImages[1]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="Image is coming soon" height={200}  placeholder="Image coming soon"/>
                <img  src={spot.SpotImages[2]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg" } alt="spot-Images" height={200} />
                <img  src={spot.SpotImages[3]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="spot-Images" height={200}  />
                <img  src={spot.SpotImages[4]?.url || "https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684121802/Airbnb-images/ET-IMAGE-COMING-SOON-1000_ys87xr.jpg"} alt="spot-Images" height={200} />    
            </div>
        </div>

        <div className="text-div">
            <div className="h2-spot-description">
                <h2 className="spot-user-heading">Hosted by {SpotUser.firstName} {SpotUser.lastName}</h2>
                <p>{spot.description}</p>
            </div>
            
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
                
                <button className="reserve-button" onClick={handlealert}>Reserve</button>    
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
