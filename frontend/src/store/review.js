//************************Imports*******************//
import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const LOAD_REVIEWS = "spot/loadreviews";
const DELETE_REVIEW = "review/deleteReview"
const CREATE_REVIEW = "review/createReview"
const CURRENT_USER_REVIEW = "review/currentuserreviews"



//************************ Action Creators *******************//
const loadreviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};
const currentuserreviews = (reviews) => {
  return {
    type: CURRENT_USER_REVIEW,
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
  

  export const thunkloadcurrentuserreviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)
    if(response.ok) {
      const allReviews = await response.json();
      dispatch(currentuserreviews(allReviews));
      return allReviews
      
    }  
  };


export const thunkdeletereview = (reviewId) => async (dispatch) => {
    
    const response = await csrfFetch(`/api/reviews/${reviewId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const deletedresponse = await response.json();
      
      dispatch(deleteReview(reviewId))
      return deletedresponse
    }
  }

export const thunkcreatenewReview = (review,spotId) => async (dispatch) => {
    
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
    method:'POST',
    headers:{ "Content-Type" : 'application/json' },
    body: 
     JSON.stringify(review)
    
    })
    
    if(response.ok) {
    const  newReview = await response.json();
    dispatch(thunkloadreviews(spotId))
    return newReview;  

    }
}


const initialState = { 
    allReviews:{},
    singleReview:{}
   };


const reviewReducer = (state = initialState, action) => {
    let newState= { ...state, allReviews: {...state.allReviews}, singleReview: {...state.singleReview}}
    switch (action.type) {
      case LOAD_REVIEWS:
        newState= { 
          allReviews:{},
          singleReview:{}
         };
        action.payload.Reviews.map((review) => {
         newState.allReviews[review.id]=review
        })
        return newState;
        case CURRENT_USER_REVIEW:
          newState= { 
            allCurrentUserReviews:{},
            
           };
          action.payload.Reviews.map((review) => {
           newState.allCurrentUserReviews[review.id]=review
          })
          return newState;
      case DELETE_REVIEW:
        
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
