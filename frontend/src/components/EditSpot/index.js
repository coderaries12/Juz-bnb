import { useSelector,useDispatch} from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { thunkeditnewspot } from "../../store/spot";
import { useState, useEffect} from "react";
import './editSpot.css'





export default function EditSpot () {

 const {spotId}=useParams();
 
 const editspot = useSelector(state => state?.spots.allSpots[spotId])
 
 
    const [country, setCountry] = useState("");
	const [address, setAddress] = useState('');
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
    const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
    const [price, setPrice] = useState();
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const dispatch = useDispatch();

    useEffect(() => {
		const errors = {};
		if (country==="") {
			errors.country = "Country is required";
		}
        if (address==="") {
			errors.address = "Address is required";
		}
        if (city==="") {
			errors.city = "City is required";
		}
        if (state==="") {
			errors.state = "State is required";
		}
        if (!latitude) {
			errors.latitude = "Latitude is required";
		}
        if (!longitude) {
			errors.longitude = "longitude is required";
		}
        if (name==="") {
			errors.name = "Name is required";
		}
        if (!price) {
			errors.price = "Price is required";
		}
        
        if (description.length < 30) {
        errors.description = "Description needs 30 or more characters";
        }
       
		setErrors(errors);
	}, [country,address,city,state,longitude,latitude,name,price,description]);

    const onSubmit = async (e) => {
		e.preventDefault();
		const payload = {
            ...editspot,
			country,
			address,
			city,
			state,
			lat:latitude,
			lng:longitude,
			description,
			name,
			price,	
		  };
        
         const updateSpot = await dispatch(thunkeditnewspot(payload))
        //const singleSpot = await dispatch(thunkloadsinglespot(updateSpot.id))
         
         if(updateSpot)
		  history.push(`/spots/${updateSpot?.id}`);
        }
          useEffect (() => {
            if(editspot)
            {
                setCountry(editspot.country)
                setAddress(editspot.address)
                setState(editspot.state)
                setCity(editspot.city)
                setName(editspot.name)
                setDescription(editspot.description)
                setLatitude(editspot.lat)
                setLongitude(editspot.lng)
                setPrice(editspot.price)
                
                
            }
        },[editspot])

    if(!editspot.id)   return null;


return(
    <div id="spot-editform-div">
		<form className="spot-editform" onSubmit={onSubmit}>
            <h1>Create a new Spot</h1>
			<h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
			<div>
			<label>
              <div> Country    <span className="errors"> {errors.country} </span></div>
				<div>
				<input
				    placeholder="Country"
					type="text"
					name="country"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/></div>
			</label>
			</div>
			<div>
			<label>
                <div> Street Address    <span className="errors">{errors.address} </span> </div>
				<div>
                  <input
				  placeholder="Address"
					type="text"
					name="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/></div>
			</label></div>
			<div>
            <label> 
				<span>
				<div> City    <span className="errors">{errors.city} </span> </div>
			
			<input
			    placeholder="City"
				type="text"
				name="city"
				value={city}
				onChange={(e) => setCity(e.target.value)}
			/>  
				
				<div> State   <span className="errors">{errors.state} </span> </div>
				<input
				    placeholder="State"
					type="text"
					name="state"
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>  	
				</span>
			</label>
			</div>
			<label>
                <div> Latitude   <span className="errors">{errors.latitude} </span> </div>
				<div>
                  <input
				  placeholder="Latitude"
					type="number"
					name="latitude"
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
				/></div>
			</label>
			<label>
                <div> Longitude   <span className="errors">{errors.longitude} </span> </div>
				<div>
                  <input
				  placeholder="Longitude"
					type="number"
					name="longitude"
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
				/></div>
			</label>
			<label>
				<div>______________________________________________________________</div>
                <h4>  Describe your place to guests  </h4>
				<p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <textarea
				   placeholder="Description"
				    cols={55}
					rows={8}
					type=""
					name="description"
					style={{resize:"none"}}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<p className="errors">{errors.description} </p>


			<label>
				<div>_____________________________________________________________ </div>
			    <h4>  Create a title for your spot  </h4>
				<p>Catch guest's attention with a spot title that highlights what makes your place special.</p>
				<div>
                  <input
				  placeholder="Name of your spot"
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/></div>
			</label>
			<p className="errors">{errors.name} </p>

			<label>
				<div>___________________________________________________________</div>
                <h4>  Set a base price for your spot  </h4>
				<p>Competitive pricing can help your listing stand out and rank high in search results.</p>
                  $<input
				    placeholder="Price per night(USD)"
					type="number"
					name="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</label>
            <div>
			<button className="editform-button" type="submit" onClick={onSubmit}>
				Edit Spot
			</button></div>
        </form>
    </div>
    
)

}
