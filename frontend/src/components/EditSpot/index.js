import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateSpot from "../CreateSpot";

function EditSpot () {

 const {spotId}=useParams();
 const editspot = useSelector(state => state?.allSpots[spotId])
 if(!editspot.id)   return null;

 
    










}

export default EditSpot
