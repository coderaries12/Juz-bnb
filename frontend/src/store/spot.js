//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_SPOTS = "spot/loadSpots";
const LOAD_SINGLE_SPOT = "spot/loadSingleSpot"
const CREATE_SPOT = 'spot/createSpot'
const EDIT_SPOT = 'spot/editSpot'


//************************ Action Creators *******************//
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
  };
};

const loadSingleSpot = (spot) => {
  console.log("Inside the single spot action creator",spot)
  return {
    type: LOAD_SINGLE_SPOT,
    spot
    
  };
};

const createSpot = (newSpot) => {
  return {
    type: CREATE_SPOT,
    newSpot
    
  };
};

const editSpot = (editspot) => {
  return {
    type: EDIT_SPOT,
    editspot
    
  };
};







//************************ Thunk Creators *******************//
export const thunkloadspots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots")
  if(response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots
    
  }  
};

export const thunkloadsinglespot = (spotId) => async (dispatch) => {
  console.log("Inside the single spot thunk",spotId)
  const response = await csrfFetch(`/api/spots/${spotId}`)
  if(response.ok) {
    const spot = await response.json();
    dispatch(loadSingleSpot(spot));
    return spot
    
  }  
  
};

export const thunkcreateanewspot = (spot,images) => async (dispatch) => {
  //console.log("Inside the single spot thunk",spotId)
  let response = await csrfFetch('/api/spots',{
  method:'POST',
  headers:{ "Content-Type" : 'application/json' },
  body: 
   JSON.stringify(spot)
  
  })
  if(response.ok) {
    const newSpot = await response.json();
    //dispatch(createSpot(newSpot));
    //let imageArray=[];
    for(let i = 0; i < images.length; i++){
      let imageObject = {
        url:images[i],
        preview:true
      }
      response = await csrfFetch (`/api/spots/${newSpot.id}/images`,{
        method:'POST',
        headers:{ "Content-Type" : 'application/json' },
        body: 
        JSON.stringify(imageObject)
    })
    
    const res = await csrfFetch (`/api/spots/${newSpot.id}`)
    const newSpotEdit = await response.json();
    //imageArray.push(newSpotImages)
    dispatch(createSpot(newSpotEdit))
    //console.log("Inside create thunk spotImagesArray",imageArray)
    return newSpotEdit;
  } 
  }   
};

export const thunkeditnewspot = (spot) => async (dispatch) => {
  //console.log("Inside the single spot thunk",spotId)
  const response = await csrfFetch(`/api/spots/${spot.id}`,{
  method:'PUT',
  headers:{ "Content-Type" : 'application/json' },
  body: 
   JSON.stringify(spot)
  
  })
  if(response.ok) {
    const editSpot = await response.json();
    dispatch(editSpot(editSpot))
    return editSpot
  }
}




//************************ Reducer *******************//
const initialState = { 
  allSpots:{},
  singleSpot:{}
 };

const spotReducer = (state = initialState, action) => {
  const newState= { ...state, allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
  switch (action.type) {
    case LOAD_SPOTS:
      action.payload.Spots.map((spot) => {
       newState.allSpots[spot.id]=spot
      })
      return newState;
      
    case LOAD_SINGLE_SPOT:
      console.log("Inside the single spot switch case")
        newState.singleSpot = {...action.spot}
        return newState
    case CREATE_SPOT:
      newState.allSpots[action.newSpot.id]=action.newSpot
      return newState
    case EDIT_SPOT:
      newState.allSpots[action.editSpot.id]=action.editSpot
      return newState
    
    default:
      return state;
  }
};

export default spotReducer;
