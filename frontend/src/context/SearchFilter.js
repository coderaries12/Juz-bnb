import React from "react";
import { useState, createContext, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunkloadspots } from "../store/spot";
// import { thunkloadspots } from "../../store/spot";


export const SearchContext = createContext()

export const SearchFilter = (props) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const spots = Object.values(state?.spots?.allSpots)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredSpots, setFilteredSpots] = useState(spots)

console.log(spots)
//   console.log(filteredProducts)

  useEffect(() => {
    dispatch(thunkloadspots())
  }, [dispatch])

  useEffect(() => {
    if (filteredSpots.length === 0) setFilteredSpots(spots)
  }, [spots])

  return (
    <SearchContext.Provider
      value={{
        spots,
        filteredSpots,
        setFilteredSpots,
        searchQuery,
        setSearchQuery,
      }}>
      {props.children}
    </SearchContext.Provider>
  )
}
