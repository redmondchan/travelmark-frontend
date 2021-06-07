import React, { useEffect } from "react";
import { Segment } from 'semantic-ui-react'

const Search = (props) => {

    useEffect(() => {
      console.log("loaded")
      fetch('http://localhost:8083/countries')
        .then(response => response.json())
        .then(countries => {
          for (let i = 0; i < countries.length; i++) {
            let countriesDropdown = document.getElementById("countries")
            let countryOption = document.createElement("option")
            countryOption.value = countries[i].name
            countryOption.id = countries[i].id
            countriesDropdown.append(countryOption)
          }
        });
    })



    function populateCities(event) {
      //clears all city options so cities from other countries are not there when a user selects a different coutnry
      console.log(document.getElementById("cities"))
      let citiesDropdown = document.getElementById("cities")
      while (citiesDropdown.firstChild) {
        citiesDropdown.removeChild(citiesDropdown.firstChild);
      }

      //clears selected city when user changes country
      let cityInput = document.getElementById("input__city")
      cityInput.value = ""

      //finds selected country option
      let selectedCountryOption = document.querySelector(`[value="${event.target.value}"]`)

      //if selected country option is found, create city datalist
      if (selectedCountryOption) {
        document.getElementById("input__country").setCustomValidity('')
        cityInput.removeAttribute("disabled")
        //fetch cities and append to datalist
        fetch(`http://localhost:8083/findCitiesByCountryId/${selectedCountryOption.id}`)
          .then(response => response.json())
          .then(cities => {
            for (let i = 0; i < cities.length; i++) {
              let cityOption = document.createElement("option")
              cityOption.value = cities[i].name
              cityOption.id = cities[i].id
              citiesDropdown.append(cityOption)
            }

            //alerts me if a country has cities with the same name
            let citiesArr = []
            for (let j = 0; j < cities.length; j++) {
              citiesArr.push(cities[j].name)
            }
            let uniqueCities = [...new Set(citiesArr)]
            if (citiesArr.length !== uniqueCities.length) {
              alert("Duplicate Cities")
            }
          })
      } else {
        document.getElementById("input__city").setAttribute("disabled", true)
        document.getElementById("input__country").setCustomValidity('Please select a valid country')
      }
    }

    function validateCity(e) {
      console.log("validate city")
      //get city input value
      let selectedCity = e.target.value
      //check if value exists in datalist
      let cityExist = document.querySelector(`[value="${e.target.value}"]`)
      if(!cityExist){
        //if it doesn't exist, set input into invalid and set custom message
        document.getElementById("input__city").setCustomValidity('Please select a valid city')
      } else {
        //if it does, set input to valid
        document.getElementById("input__city").setCustomValidity('')
      }
    }

    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        console.log('enter press here! ')
        console.log(event.target)
        event.target.blur()
      }
    }

 return (
   <Segment>
    <form id="form" onSubmit={props.handleSubmit}>
        <label className="label__country">Country:
        <input list="countries" placeholder="Search Country.." id="input__country" onChange={populateCities.bind()} onKeyPress={handleKeyPress}/>
        <datalist id="countries"></datalist>
        </label>

        <label className="label__city">City:</label>
        <input list="cities" placeholder="Search City.." id="input__city" disabled onChange={validateCity.bind()} onKeyPress={handleKeyPress}/>
        <datalist id="cities"></datalist>

        <input id="submit" type="submit"/>
      </form>
    </Segment>
 );
};

export default Search;
