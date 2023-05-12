import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { thunkcreateanewspot } from "../../store/spot";
import { useDispatch } from "react-redux";
import { thunkeditnewspot } from "../../store/spot";



function CreateSpot({spot,formType}) {
	console.log("Hitting Create spot component")
	const [country, setCountry] = useState("");
	const [address, setAddress] = useState('');
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
    const [latitude, setLatitude] = useState();
	const [longitude, setLongitude] = useState();
	const [description, setDescription] = useState("");
	const [name, setName] = useState("");
    const [price, setPrice] = useState();
	const [previewimage, setPreviewimage] = useState('');
	const [url1, seturl1] = useState("");
    const [url2, seturl2] = useState("");
    const [url3, seturl3] = useState("");
    const [url4, seturl4] = useState("");
	const [preview, setPreview] = useState(false);
	
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
        if (previewimage==="") {
			errors.previewimage = "Preview Image is required";
		}
        if (description.length < 30) {
        errors.description = "Description needs 30 or more characters";
        }
       if (url1.match(/\.(jpeg|jpg|png)$/) === null || url2.match(/\.(jpeg|jpg|png)$/) === null || url3.match(/\.(jpeg|jpg|png)$/) === null || url4.match(/\.(jpeg|jpg|png)$/) === null ) {
        errors.url1 = "Image URL must end in .png, .jpg, or .jpeg";
       }
		setErrors(errors);
	}, [country,address,city,state,longitude,latitude,name,price,description,previewimage,url1,url2,url3,url4]);

	 const onSubmit = async (e) => {
		e.preventDefault();
		const payload = {
			country,
			address,
			city,
			state,
			lat:latitude,
			lng:longitude,
			description,
			name,
			price,
			previewImage:previewimage,
			url1,
			url2,
			url3,
			url4,
			
		  };
		  const images = [{url:previewimage,preview:true},{url:url1,preview},{url:url2,preview},{url:url3,preview},{url:url4,preview}]
		 
		
	    
		  let createdSpot= await dispatch(thunkcreateanewspot(payload,images));
		  console.log("created Spot images array",images)
	  
		  if (createdSpot) {
			history.push(`/spots/${createdSpot.id}`);
		  }
		
	};

	
	

	return (
		<div className="spot-form-div">
		<form className="spot-form" onSubmit={onSubmit}>
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
                <h4>  Describe your place to guests  </h4>
				<p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                  <textarea
				   placeholder="Description"
					type=""
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<p className="errors">{errors.description} </p>


			<label>
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
			<p className="errors">{errors.price} </p>
			
			<label>
			   <h4> Liven up your spot with photos </h4>
				<p>Submit a link to at least one photo to publish your spot.</p>
				
                  <input
					type="url"
					name="previewImage"
					placeholder="Preview Image URL"
					value={previewimage}
					onChange={(e) => setPreviewimage(e.target.value)}
				/>
			</label>
			<p className="errors">{errors.previewimage} </p>
			<label>
                
				<div>
                  <input
				  placeholder="Image URL"
					type="url"
					name="image1"
					value={url1}
					onChange={(e) => seturl1(e.target.value)}
				/></div>
			</label>
			<p className="errors">{errors.url1} </p>
           
			<label>
				<div>
                  <input
				  placeholder="Image URL"
					type="url"
					name="image2"
					value={url2}
					onChange={(e) => seturl2(e.target.value)}
				/></div>
			</label>
			<label>
				<div>
                  <input
				  placeholder="Image URL"
					type="url"
					name="image3"
					value={url3}
					onChange={(e) => seturl3(e.target.value)}
				/></div>
			</label>
			<label>
				<div>
                  <input
				  placeholder="Image URL"
					type="url"
					name="image4"
					value={url4}
					onChange={(e) => seturl4(e.target.value)}
				/></div>
			</label>

			
			

			<div>
			<button type="submit" disabled={!!Object.values(errors).length}>
				Create Spot
			</button></div>
		</form>
		</div>
	);
}

export default CreateSpot;
