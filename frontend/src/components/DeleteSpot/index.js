import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkcurrentuserspot, thunkdeletespot } from "../../store/spot";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './deletespot.css'




function DeleteSpot ({spotId}) {
 const history = useHistory()
 const dispatch = useDispatch()
 //const {spotId} = useParams();
 const {closeModal} =  useModal();

 const deleteSpot = useSelector(state => state?.spots.allSpots[spotId])
// const newspot = useSelector(state => state?.spots.allSpots)

 if(deleteSpot === {})   return null;

//  function handleSubmit(){
//     dispatch(thunkdeletespot(deleteSpot.id))
    
//     history.push('/')
// }
const handleSubmityes = async (e) => {
const deletedSpot= await dispatch(thunkdeletespot(deleteSpot.id))
  e.preventDefault();
  await closeModal()
  // await dispatch(thunkcurrentuserspot())
  if(deletedSpot){
    history.push('/spots/current')
  }
  //

};
const handleSubmitno = async (e) => {
  e.preventDefault()
closeModal()
}


return(
    
        <div className="spot-to-delete">
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <form>
        <div className="delete-buttons">
          <button  className="yes-button" onClick={handleSubmityes}>Yes (Delete Spot)</button>
          <button  className="no-button" onClick={handleSubmitno}> No (Keep Spot)</button>
          </div>
        </form>
                        
            

        </div>
        
    )
    


}

export default DeleteSpot
