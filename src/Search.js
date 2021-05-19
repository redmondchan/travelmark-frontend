import React, { useEffect } from "react";

const Search = () => {

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

 return (
   <div>
    <form id="form">
        <label>Country:</label>
        <input list="countries" placeholder="Search Country.." id="input__country"/>
        <datalist id="countries">

        </datalist>
        <label>City:</label>
        <input list="cities" placeholder="Search City.." id="input__city" disabled/>
        <datalist id="cities">

        </datalist>
        <input id="submit" type="submit"/>
      </form>
    </div>
 );
};

export default Search;
