//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_SPOTS = "spot/loadSpots";
const LOAD_SINGLE_SPOT = "spot/loadSingleSpot"
const CREATE_SPOT = 'spot/createSpot'


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

const createSpot = (newspot) => {
  //console.log("Inside the single spot action creator",spot)
  return {
    type: CREATE_SPOT,
    newspot
    
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

export const thunkcreateanewspot = (newSpot) => async (dispatch) => {
  //console.log("Inside the single spot thunk",spotId)
  const response = await csrfFetch('/api/spots',{
  method:'POST',
  headers:{ "Content-Type" : 'application/json' },
  body: 
   JSON.stringify(newSpot)
  
  })
  if(response.ok) {
    const newspot = await response.json();
    dispatch(createSpot(newspot));
    return newspot
    
  }  
  
};



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
    
    default:
      return state;
  }
};

export default spotReducer;
