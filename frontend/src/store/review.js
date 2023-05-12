//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_REVIEWS = "spot/loadreviews";
const DELETE_REVIEW = "review/deleteReview"
const CREATE_REVIEW = "review/createReview"



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
const createReview = (newReview) => {
    return {
      type: CREATE_REVIEW,
      newReview
      
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
    console.log("Inside the delete review thunk",reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const deletedresponse = await response.json();
      console.log("inside the delete thunk- show review to delete",deletedresponse)
      dispatch(deleteReview(reviewId))
      return deletedresponse
    }
  }

export const thunkcreatenewReview = (review,spotId) => async (dispatch) => {
    //console.log("Inside the single spot thunk",spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method:'POST',
    headers:{ "Content-Type" : 'application/json' },
    body: 
     JSON.stringify(review)
    
    })
    
    if(response.ok) {
    const  newReview = await response.json();
    dispatch(createReview(newReview))
    return newReview;  

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
        console.log("inside the delete review reducer",action.deletereviewid)
        delete newState.allReviews[action.deletereviewid]
        return newState; 
      case CREATE_REVIEW:
        newState.allReviews[action.newReview.id]=action.newReview
        return newState
        default:
        return state;
            
      



    }
}











export default reviewReducer;
