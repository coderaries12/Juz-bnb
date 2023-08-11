// frontend/src/components/Navigation/index.js
import React, {useEffect, useState,useContext} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { SearchContext } from '../../context/SearchFilter';

function Navigation({ isLoaded }){
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user);
  
  
  const { spots, setFilteredSpots, searchQuery, setSearchQuery } =
    useContext(SearchContext)
   const [searchResults, setSearchResults] = useState([])
   console.log(SearchContext)

   const handleSearchQueryChange = (e) => {
		const query = e.target.value
		setSearchQuery(query)
	    console.log("search results",query,searchResults)
		if (query.trim() === "") {
		  setSearchResults([])
		  setFilteredSpots(spots)
		} else {
		  const results = Object.values(spots).filter((spot) =>
			spot.name.toLowerCase().includes(query.toLowerCase())
		  )
		  console.log("results",results)
		  setSearchResults(results)
		  setFilteredSpots(results)
		}
		console.log("search results",searchResults)
	  }
	
	  const handleSearchResultClick = (spot) => {
		console.log("inside the nav ", spot)
		setSearchResults([])
		setFilteredSpots(spots)
		setSearchQuery("")
		console.log("inside the nav search bar", spots)
		history.push(`/spots/${spot.id}`)
	  }
	
	  useEffect(() => {
		history.listen(() => {
		  setSearchResults([])
		  setFilteredSpots(spots)
		  setSearchQuery("")
		})
	  }, [history])

  return (
    <div className='nav-div'>
    <div className='nav-left-div'>
        <NavLink exact to="/" className="logo-nav">
          <img className='logo-image' src=" https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684096377/Airbnb-images/Logo_hxslbp.png" alt='logo' /> 
          </NavLink>
    </div>
    <div className='navigation'>
					<form>
						<input 
						type='search' 
						placeholder="Search for destination..."
						value={searchQuery}
						onChange={handleSearchQueryChange}
            >
              
            </input>
						<button classname="magnify-glass" disabled={true}>
							<i className="fa-solid fa-magnifying-glass fa-xl" />
						</button>
					</form>
					{searchResults.length > 0 && (
						<ul className="search-results">
							{searchResults.map((spot) => (
								<li
								key={spot.id}
								onClick={() => handleSearchResultClick(spot)}>
								{spot.name}
								</li>
							))}
						</ul>
          			)}
				</div>
    <div className='nav-right-div'>
      {isLoaded && (<ProfileButton user={sessionUser} />)}
    </div>
    </div>
  );
}

export default Navigation;
