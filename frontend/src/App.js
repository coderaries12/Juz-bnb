import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotList from "./components/SpotList";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";
import CurrentUserSpotList from "./components/CurrentUserSpotList";
import EditSpot from "./components/EditSpot";
import DeleteSpot from "./components/DeleteSpot";
import ReviewList from "./components/ReviewList";
import DeleteReview from "./components/DeleteReview";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        
        <Route exact path='/'>
         <SpotList />
        </Route>
        <Route exact path='/spots/current'>
         <CurrentUserSpotList />
        </Route>
        <Route exact path='/spots/new'>
         <CreateSpot />
        </Route>
        <Route exact path='/spots/:spotId'>
         <SingleSpot />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
         <EditSpot />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
         <EditSpot />
        </Route>
        <Route exact path='/spots/:spotId/delete'>
         <DeleteSpot />
        </Route>
        
        <Route exact path='/reviews'>
         <ReviewList />
        </Route>
        <Route exact path='/reviews/:reviewId/delete'>
         <DeleteReview />
        </Route>


       
        </Switch>}
    </>
  );
}

export default App;
