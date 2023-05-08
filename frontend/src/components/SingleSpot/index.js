import React from "react";
import { useEffect } from "react";
import { useParams,useHistory } from "react-router-dom";
import { thunkloadsinglespot } from "../../store/spot";
import { useDispatch, useSelector } from "react-redux";
import './singleSpot.css'

export default function SingleSpot(){
    const dispatch = useDispatch()
    const {spotId}=useParams()
    //const spot = useSelector(state => state.spots.allSpots[spotId])
    const spot=useSelector(state => state?.spots.singleSpot)
    const SpotImages = useSelector(state => state?.spots.singleSpot.SpotImages)
    const SpotUser = useSelector(state => state?.spots.singleSpot.Owner)
   // const spot = Object.values(spotObj)
    console.log("SingleSpots",spot.numReviews)
    
   // console.log(imagesArray)
    
    useEffect(() =>{
    dispatch(thunkloadsinglespot(spotId))

    },[dispatch])

    // alert function
    function handlealert(){
        alert("Feature coming soon......")
    }
    
    if(!spot.id) return null;
    
    return(
        <div>
            <div><h2>{spot.name}</h2></div>
            <div><p>{spot.city}, {spot.state}, {spot.country}</p></div>
            <div className="spot-images-div">
            {/* <div className="big-image"><img key={SpotImages[0].id} src={SpotImages[0].url} alt="spot-Images" height={420} width={600} /></div> */}
            {/* <div className="small-images">
            <div> <img key={SpotImages[1].id} src={SpotImages[1].url} alt="spot-Images" height={200} width={300} /></div>
            <div> <img key={SpotImages[2].id} src={SpotImages[2].url} alt="spot-Images" height={200} width={300} /></div>
            <div> <img key={SpotImages[3].id} src={SpotImages[3].url} alt="spot-Images" height={200} width={300} /></div>
            <div> <img key={SpotImages[4].id} src={SpotImages[4].url} alt="spot-Images" height={200} width={300} /></div>
        </div> */}
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
        </div>
    )
}
