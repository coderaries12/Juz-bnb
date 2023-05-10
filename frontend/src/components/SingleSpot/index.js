import React from "react";
import { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    //const spotobj = useSelector(state => state?.spots.allSpots[spotId])
    const spot=useSelector(state => state?.spots.singleSpot)
    //const SpotImages = useSelector(state => state?.spots.singleSpot.SpotImages)
    const SpotUser = useSelector(state => state?.spots.singleSpot.Owner)
   
    useEffect(() =>{
    dispatch(thunkloadsinglespot(spotId))

    },[dispatch])

    // alert function
    function handlealert(){
        alert("Feature coming soon......")
    }
    
    if(!spot.id ) return null;
    if(!spot.avgStarRating)  { spot.avgStarRating = "New"}
    
    return(
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
        <div>
            <p>★{spot.avgStarRating}</p>
            <p>{spot.numReviews} reviews</p>
        </div>
        </div>
    )
}
