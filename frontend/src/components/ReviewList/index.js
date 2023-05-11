import React from "react";
import { useEffect } from "react";
import { thunkloadreviews } from "../../store/review";
import { useDispatch, useSelector } from "react-redux";
import './reviewlist.css'
import { NavLink } from "react-router-dom";

export default function ReviewList(){
    const dispatch = useDispatch()
    const reviewsObj = useSelector((state) => state?.reviews.allReviews)
    const reviews = Object.values(reviewsObj)
    console.log("Reviews in reviewlist component",reviews)
    
    useEffect(() =>{
    dispatch(thunkloadreviews(reviewsObj.spotId))

    },[dispatch])
    if(!reviewsObj.id) return null;

    return(
        <div>
        <h1>Inside the load reviews component</h1>
        </div>
    )

}
