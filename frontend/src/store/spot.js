//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_SPOTS = "spot/loadSpots";


//************************ Action Creators *******************//
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    payload: spots,
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

//************************ Reducer *******************//
const initialState = { 
  allSpots:{},
  singleSpot:{}
 };

const spotReducer = (state = initialState, action) => {
  let newState= { ...state }
  switch (action.type) {
    case LOAD_SPOTS:
      action.payload.Spots.map((spot) => {
       newState.allSpots[spot.id]=spot
      })
      return newState;
    
    default:
      return state;
  }
};

export default spotReducer;
