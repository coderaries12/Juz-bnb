import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkcurrentuserspot, thunkdeletespot } from "../../store/spot";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkdeletereview } from "../../store/review";




function DeleteReview ({reviewId}) {
 const history = useHistory()
 const dispatch = useDispatch()
 //const {spotId} = useParams();
 const {closeModal} =  useModal();

 const deleteReview = useSelector(state => state?.reviews.allReviews[reviewId])
// const newspot = useSelector(state => state?.spots.allSpots)
// console.log("from delete spot component1",newspot)
 console.log("from delete spot component2",deleteReview)
 if(deleteReview === {})   return null;

//  function handleSubmit(){
//     dispatch(thunkdeletespot(deleteSpot.id))
    
//     history.push('/')
// }
const handleSubmityes = async (e) => {
const deletedReview= await dispatch(thunkdeletereview(deleteReview.id))
  e.preventDefault();
  await closeModal()
  // await dispatch(thunkcurrentuserspot())
  if(deletedReview){
    history.push('/spots/current')
  }
  //

};
const handleSubmitno = async (e) => {
  e.preventDefault()
closeModal()
}


return(
    
        <div>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
        <form>
        <div className="delete-review-buttons">
          <button  className="yes-button" onClick={handleSubmityes}>Yes (Delete Review)</button>
          <button  onClick={handleSubmitno}> No (Keep Review)</button>
          </div>
        </form>
                        
            

        </div>
        
    )
    


}

export default DeleteReview
