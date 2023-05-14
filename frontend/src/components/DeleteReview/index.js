import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkdeletereview } from "../../store/review";
import './deleteReview.css'

function DeleteReview ({reviewId,spotId}) {
 const history = useHistory()
 const dispatch = useDispatch()
 const {closeModal} =  useModal();

 const deleteReview = useSelector(state => state?.reviews.allReviews[reviewId])

 console.log("from delete spot component2",deleteReview)
 if(deleteReview === {})   return null;


const handleSubmityes = async (e) => {
     e.preventDefault(); 
console.log("Inside the yes delete handler")
const deletedReview= await dispatch(thunkdeletereview(deleteReview.id))
  
  if(deletedReview){
    closeModal()
    history.push(`/spots/${spotId}`)
    
  }
  

};
const handleSubmitno = async (e) => {
e.preventDefault()
closeModal()
}


return(
    
    <div className="review-to-delete">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <form>
        <div className="delete-review-buttons">
          <button  className="yes-button" onClick={handleSubmityes}>Yes (Delete Review)</button>
          <button  className="no-button" onClick={handleSubmitno}> No (Keep Review)</button>
          </div>
        </form>
                        
            

    </div>
        
    )
    


}

export default DeleteReview
