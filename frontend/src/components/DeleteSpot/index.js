import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkdeletespot } from "../../store/spot";
import { useHistory } from "react-router-dom";




function DeleteSpot () {
 const history = useHistory()
 const dispatch = useDispatch()
 const {spotId}=useParams();
 const deleteSpot = useSelector(state => state?.spots.allSpots[spotId])
 console.log("from delete spot component",deleteSpot)
 if(deleteSpot === {})   return null;

 function handleSubmit(){
    dispatch(thunkdeletespot(deleteSpot.id))
    
    history.push('/')
}
// const handleDelete = (e) => {
//   dispatch(deleteReport(report.id))
//   e.preventDefault();
// };


return(
    
        <div>
        <h1>Confrm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <div className="delete-buttons">
          <button  className="yes-button" onClick={handleSubmit}>Yes (Delete Spot)</button>
          <button >No (Keep Spot)</button>
                        
            

        </div>
        </div>
    )
    


}

export default DeleteSpot
