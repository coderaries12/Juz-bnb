import { csrfFetch } from "./csrf";

//************************ Imports *******************//
const GET_BOOKINGS = "spot/loadBookings";
const CREATE_BOOKING = 'spot/createBooking'
const EDIT_BOOKING = 'spot/editBooking'
const DELETE_BOOKING = 'spot/deleteBooking'

//************************ Action Creators *******************//
const loadBookings = (bookings) => {
    return {
      type: GET_BOOKINGS,
      bookings,
    };
  };
  
  
  const createBooking = (newbooking) => {
    return {
      type: CREATE_BOOKING,
      newbooking
      
    };
  };
  
  const editBooking = (editbooking) => {
    return {
      type: EDIT_BOOKING,
      editbooking
      
    };
  };
  const deleteBooking = (bookingid) => {
    return {
      type: DELETE_BOOKING,
      bookingid
      
    };
  };
  

  //************************ Thunk Creators *******************//
  export const thunkloadbookings = () => async (dispatch) => {
    const response = await csrfFetch("/api/bookings/current")
    if(response.ok) {
      const bookings = await response.json();
      dispatch(loadBookings(bookings));
      return bookings
      
    }  
  };
  
  export const thunkcreateanewbooking = (booking,spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`,{
    method:'POST',
    headers:{ "Content-Type" : 'application/json' },
    body: 
     JSON.stringify(booking)
    
    })
    let newbooking 
    if(response.ok) {
        newbooking = await response.json();
        dispatch(createBooking(newbooking))
    } 
    
    return newbooking;  
  };
  
  export const thunkeditnewbooking = (booking) => async (dispatch) => {
  
    const response = await csrfFetch(`/api/bookings/${booking.id}`,{
    method:'PUT',
    headers:{ "Content-Type" : 'application/json' },
    body: 
     JSON.stringify(booking)
    
    })
    if(response.ok) {
      const Bookingtoedit = await response.json();
      dispatch(editBooking(Bookingtoedit))
      
      return Bookingtoedit
    }
  }
  
  export const thunkdeletebooking = (bookingId) => async (dispatch) => {
    
    const response = await csrfFetch(`/api/bookings/${bookingId}`,{
    method:'DELETE'
    })
    if(response.ok) {
      const Bookingtodelete = await response.json();
      dispatch(deleteBooking(Bookingtodelete.id))
      return Bookingtodelete
    }
  }
  
  

  
  //************************ Reducer *******************//
  const initialState = { 
    allBookings:{},
    
   };
  
  const bookingReducer = (state = initialState, action) => {
    let newState= { ...state, allBookings: {...state.allBookings}}
    switch (action.type) {
      case GET_BOOKINGS:
        action.bookings.Bookings.map((booking) => {
         newState.allBookings[booking.id]=booking
        })
        return newState;
      case CREATE_BOOKING:
        newState.allBookings[action.newbooking.id]=action.newbooking
        return newState
      case EDIT_BOOKING:
        newState.allBookings[action.editbooking.id]=action.editbooking
        return newState
      case DELETE_BOOKING:
        delete newState.allBookings[action.bookingid]
        return newState;
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  
