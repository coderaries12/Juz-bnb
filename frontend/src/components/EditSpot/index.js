import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateSpot from "../CreateSpot";


function EditSpot () {

 const {spotId}=useParams();
 const editspot = useSelector(state => state?.spots.allSpots[spotId])
 console.log("from edit spot component",editspot)
 if(!editspot.id)   return null;

return(
    Object.keys(editspot).length >= 1 && (
        <div>
        <CreateSpot spot={editspot} formType="Update Spot" />
        </div>
    )
    
)

}

export default EditSpot
