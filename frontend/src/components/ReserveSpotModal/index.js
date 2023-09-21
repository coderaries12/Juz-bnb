import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom";
import {thunkcreateanewbooking} from "../../store/booking"
import {thunkloadbookings} from "../../store/booking"
import DatePicker from "react-datepicker";
import CurrentUserBookingList from "../CurrentUserBookingList";
import "react-datepicker/dist/react-datepicker.css";
import './ReserveSpotModal.css'

export default function ReserveSpotModal({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const initialEndDate = startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null;
    const [endDate, setEndDate] = useState(initialEndDate);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const { setModalContent } = useModal();
    const { closeModal } = useModal();

    useEffect(() => {
        let errors = {};
        if (!startDate) errors.start = "Start date is required"
        if (!endDate) errors.end = "End date is required"

        setErrors(errors);

    }, [startDate, endDate])

    function calculateNumberOfNights() {
        const oneDay = 24 * 60 * 60 * 1000;
        const checkIn = new Date(startDate);
        const checkOut = new Date(endDate);
        const numberOfNights = Math.round(Math.abs((checkIn - checkOut) / oneDay));
    
        return numberOfNights;
      }
    
      function calculateTotalAmount() {
        const numberOfNights = calculateNumberOfNights();
        const totalAmount = spot.price * numberOfNights;
    
        return totalAmount;
      }


    useEffect(() => {
        setEndDate(initialEndDate)
    }, [startDate])

    function handleSubmit(e) {
       
        e.preventDefault();
        setSubmitted(true);

        const newBooking = {
            startDate,
            endDate,
          };
      
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (startDate < today) {
            setErrors("You cannot book a spot in the past.");
            return;
          }
          if (Object.values(errors).length) return;

          dispatch(CurrentUserBookingList(spot.id, newBooking))
          .then(() => {
            setModalContent(
              <div className="reserved-modal">
                <h2>Reservation booked!</h2>
                <p>To manage your booked getaways head to the user profile.</p>
              </div>
            );
          })
                // let newErrors = {};
                // if (error && error.message === "Authentication required") {
                //     newErrors.message = "You must be logged in to request a booking"
                // }
                // if (error && error.endDate) {
                //     newErrors.end = error.endDate;

                // }
                // if (error && error.startDate) {

                //     newErrors.start = error.startDate;
                // }
                // if (!error) {

                //     newErrors.message = "You can not book a reservation for your own spot."
                // }
                // setErrors(newErrors);
                return
            



    }



    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2>Book your reservation:</h2>
            {submitted && errors.message && (<p className="errors">{errors.message}</p>)}
            <label className="review-label inside">
                <div className="errors-inside">
                    Start Date
                    {submitted && errors.start && (<p className="errors">{errors.start}</p>)}
                </div>
                <DatePicker
                    selected={startDate}
                    className="date-input"
                    onChange={(date) => setStartDate(date)}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <label className="review-label inside">
                <div className="errors-inside">
                    End Date
                    {submitted && errors.end && (<p className="errors">{errors.end}</p>)}

                </div>
                <DatePicker
                    selected={endDate}
                    className="date-input"
                    onChange={(date) => setEndDate(date)}
                    minDate={initialEndDate}
                />
                <i className="fa-regular fa-calendar"></i>
            </label>
            <button type="submit" className="review-button">Reserve Spot</button>
        </form>
    )
}
