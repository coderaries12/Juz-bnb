import React from "react";
import { useEffect } from "react";
import { useParams} from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import { thunkloadreviews } from "../../store/review";
import OpenModalButton from '../OpenModalButton/index'
import DeleteReview from "../DeleteReview";
import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    //const spotobj = useSelector(state => state?.spots.allSpots[spotId])
    const spot=useSelector(state => state?.spots.singleSpot)
    const reviewsObj = useSelector((state) => state?.reviews.allReviews)
    const reviews = Object.values(reviewsObj)
    //const SpotImages = useSelector(state => state?.spots.singleSpot.SpotImages)
    const SpotUser = useSelector(state => state?.spots.singleSpot.Owner)
    console.log("reviews array",reviews)

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
    
    if(!spot.id ) return null;
    if(!spot.avgStarRating)  { spot.avgStarRating = "New"}
    
    return reviewsObj.User ? null : (
        <div>
            <div><h2>{spot.name}</h2></div>
            <div><p>{spot.city}, {spot.state}, {spot.country}</p></div>
            <div className="spot-images-div"> 
            <div className="preview-image-on-the-left"><img  src={spot.SpotImages[0].url} alt="spot-Images" height={410} width={500} />
            </div>
            <div className="image-array-for-right-side">
                <img  src={spot.SpotImages[1]?.url} alt="spot-Images" height={200} width={200} />
                <img  src={spot.SpotImages[2]?.url} alt="spot-Images" height={200} width={200} />
                <img  src={spot.SpotImages[3]?.url} alt="spot-Images" height={200} width={200} />
                <img  src={spot.SpotImages[3]?.url} alt="spot-Images" height={200} width={200} />    
            </div>
            </div>

        <div className="text-div">
            <div>
                <h2>Hosted by {SpotUser.firstName} {SpotUser.lastName}</h2>
                <p>{spot.description}</p>
                </div>
            
            <div className="call-out-box">
                
                <div className="spot-night">
                <span> ${spot.price} night  </span>
                <span> ★{spot.avgStarRating}  </span>        
                <span> {spot.numReviews} reviews </span>
                </div>               
                
                <button className="reserve-button" onClick={handlealert}>Reserve</button>    
            </div>
        </div>
        <div>_________________________________________________________________________________________________________________________________</div>
        <div className="down-rating-div">
            <span className="down-avg-span">★{spot.avgStarRating}</span>
            <span>{spot.numReviews} reviews</span>
        </div>
        <div className="reviewslist-div">
            <div>
               {
                reviews.map((r)=>{
                return(
                  <div className="reviews-info-div">
                  <h3> {r.User.firstName} {r.User.lastName} </h3>
                  <p className="review-date">{months[r.createdAt.slice(5,7)]} {r.createdAt.slice(0,4)}</p>
                  <p> {r.review} </p>
                  {(r.userId === SpotUser?.id)} &&
                  
                  <div>
                    <OpenModalButton 
                             buttonText="Delete" modalComponent={<DeleteReview reviewId={r.id} />} 
                    /> 
                 </div>
                 </div>
                )
                })
               } 
            </div>
        </div>
    </div>
    )
}
