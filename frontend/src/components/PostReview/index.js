import React from "react";
import { useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkcreatenewReview } from "../../store/review";

export default function PostReview ({spotId}) {

const [rating, setRating] = useState(0)	
const [reviewText, setReviewText] = useState("")	
const [errors, setErrors] = useState({});
const history = useHistory();
const dispatch = useDispatch();
const {closeModal} =  useModal();

// useEffect(() => {
	
//     },[rating,reviewText])

const handleSubmit = async (e) => {
    e.preventDefault();
	const submitErrors = {};
	    if (reviewText.length < 10) {
			submitErrors.reviewText = "Comment should have more than 10 characters";
		}
        if (rating === 0) {
			submitErrors.rating = "Stars must be selected";
		}
    setErrors(submitErrors);
	const payload = {
        review:reviewText,
		stars:rating,
				
	};
console.log("Rating",rating)
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
            <h2>Rate your Stay</h2>
        <form className="create-review-form"  >
                <textarea 
                className = "review-textarea"
                name = "review-text"
                rows = "9"
                cols = "50"
                value = {reviewText}
                placeholder = "Write your review here"
                onChange = {e => setReviewText(e.target.value)}
                >  </textarea>
            <div className="star-rating-div">
                <span onClick={e => setRating(1)}  > 
                <i className="fas fa-star " />
                </span>
            
                <div onClick={e =>setRating(2)} >
                <i className="fas fa-star " />
                </div>
            
                <div onClick={e =>setRating(3)}  >
                <i className="fas fa-star  " />
                </div>
            
            
                <div onClick={e =>setRating(4)}  >
                <i className="fas fa-star " />
                </div>
            
            
                <div onClick={e =>setRating(5)}  >
                <i className="fas fa-star " />
                </div>
           

            </div>

        <button onClick={handleSubmit}> Submit</button>
        </form>
    </div>
    )


    
}
