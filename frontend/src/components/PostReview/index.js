import React from "react";
import { useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkcreatenewReview } from "../../store/review";
import "./postreview.css";

export default function PostReview ({spotId,spot}) {

const [rating, setRating] = useState(0)	
const [reviewText, setReviewText] = useState("")	
const [errors, setErrors] = useState({});
const history = useHistory();
const dispatch = useDispatch();
const {closeModal} =  useModal();
console.log("review text length",reviewText.length)

// useEffect(() => {
	
//     },[rating,reviewText])

const handleSubmit = async (e) => {
    e.preventDefault();
	const errors = {};
	    if (reviewText.length < 10) {
			errors.reviewText = "Comment should have more than 10 characters";
		}
        if (rating === 0) {
			errors.rating = "Stars must be selected";
		}
    setErrors(errors);
	const payload = {
        review:reviewText,
		stars:rating,
				
	};
console.log("Rating",rating)
console.log("errors length",errors.length)
if (!errors.length){
    let createdReview= await dispatch(thunkcreatenewReview(payload,spotId));
    console.log("created Review",createdReview)
    
    
	  
	if (createdReview) {
        closeModal()
		history.push(`/spots/${spotId}`);
	}
}
		
};

    return(
    <div className="review-modal">
            <h2>How was your stay at {spot.name}</h2>
        <form className="create-review-form"  >
                <textarea 
                className = "review-textarea"
                name = "review-text"
                type = "text"
                rows = "9"
                cols = "50"
                value = {reviewText}
                placeholder = "Write your review here...."
                onChange = {e => setReviewText(e.target.value)}
                >  </textarea>
            <div className="star-rating-div">
                <div
                className={rating >=1 ? "filled" :"empty"}
                onClick={()=> setRating(1)}>
                <i className="fa-solid fa-star fa-xl " /> 
                </div>
                
                <div
                className={rating >=2 ? "filled" :"empty"}
                onClick={()=> setRating(2)}>

                <i className="fa-solid fa-star fa-xl" /> 
                                  
                </div>
            
                <div
                className={rating >=3 ? "filled" :"empty"}
                onClick={()=> setRating(3)}>

                <i className="fa-solid fa-star fa-xl " /> 
                                  
                </div>
            
            
                <div
                className={rating >=4 ? "filled" :"empty"}
                onClick={()=> setRating(4)}>

                <i className="fa-solid fa-star fa-xl" /> 
                                  
                </div>
            
            
                <div
                className={rating >=5 ? "filled" :"empty"}
                onClick={()=> setRating(5)}>

                <i className="fa-solid fa-star fa-xl " /> 
                 <span id="stars-span">{"stars"}</span>                 
                </div>

            </div>

        <button className="post-review-button" onClick={handleSubmit} disabled={!!Object.values(errors).length}> Submit</button>
        </form>
    </div>
    )


    
}
