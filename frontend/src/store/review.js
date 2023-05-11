//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_REVIEWS = "spot/loadreviews";
const DELETE_REVIEW = "review/deleteReview"



//************************ Action Creators *******************//
const loadreviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};
const deleteReview = (deletereviewid) => {
    return {
      type: DELETE_REVIEW,
      deletereviewid
      
    };
  };

//************************ Thunk Creators *******************//

export const thunkloadreviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok) {
      const allReviews = await response.json();
      dispatch(loadreviews(allReviews));
      return allReviews
      
    }  
  };

export const thunkdeletereview = (reviewId) => async (dispatch) => {
    //console.log("Inside the single spot thunk",spotId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const Reviewtodelete = await response.json();
      dispatch(deleteReview(Reviewtodelete.id))
      return Reviewtodelete
    }
  }












const initialState = { 
    allReviews:{},
    singleReview:{}
   };


const reviewReducer = (state = initialState, action) => {
    const newState= { ...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview}}
    switch (action.type) {
      case LOAD_REVIEWS:
        action.payload.Reviews.map((review) => {
         newState.allReviews[review.id]=review
        })
        return newState;
      case DELETE_REVIEW:
        console.log("inside the delete review thunk",action.deletereviewid)
        delete newState.allSpots[action.deletereviewid]
        return newState; 

        default:
        return state;
            
      



    }
}











export default reviewReducer;
