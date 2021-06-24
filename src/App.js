import { useState } from 'react';
import './App.css';
import Search from './Search'
import Results from './Results'

function App() {

  const [articles, setArticles] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();

  function handleSubmit(e){
    e.preventDefault()
    //if country picked exist in dropdown then check
    //if city is picked fetch by cities, if not fetch by countries
    //if country not on dropdown, error message
    console.log(e)
       let selectedCountry = document.getElementById("input__country").value
       let selectedCountryExist = document.querySelector(`[value="${selectedCountry}"]`)
       if(selectedCountryExist){
         setCountry(selectedCountry)
         document.querySelector(`[value="${selectedCountry}"]`)
         let selectedCity = document.getElementById("input__city").value
         //if no city is selected, fetch articles by country
         if(selectedCity == ""){
           let selectedCountryId = document.querySelector(`[value="${selectedCountry}"]`).id
           console.log(selectedCountryId)
           fetch(`http://localhost:8083/articlesByCountry/${selectedCountryId}`)
             .then(response => response.json())
             .then(articles => {
               setArticles(articles)
             })
         //if city is selected, fetch articles by city
         } else {
           setCity(selectedCity)
           let selectedCityId = document.querySelector(`[value="${selectedCity}"]`).id
           console.log(selectedCityId)
           fetch(`http://localhost:8083/articlesByCity/${selectedCityId}`)
             .then(response => response.json())
             .then(articles => {
               setArticles(articles)
             })
         }
       }else {
         console.log(selectedCountryExist)
         console.log("does not exist")
       }
    // let selectedCountry = document.getElementById("input__country").value
    // let selectedCity = document.getElementById("input__city").value
    // if(selectedCity == ""){
    //   let selectedCountryId = document.querySelector(`[value="${selectedCountry}"]`).id
    //   console.log(selectedCountryId)
    //   fetch(`http://localhost:8083/articlesByCountry/${selectedCountryId}`)
    //     .then(response => response.json())
    //     .then(articles => {
    //       console.log(articles)
    //       setArticles(articles)
    //     })
    // } else {
    //   let selectedCityId = document.querySelector(`[value="${selectedCity}"]`).id
    //   console.log(selectedCityId)
    //   fetch(`http://localhost:8083/articlesByCity/${selectedCityId}`)
    //     .then(response => response.json())
    //     .then(articles => {
    //       console.log(articles)
    //       setArticles(articles)
    //       console.log({articles})
    //     })
    // }
  }

  const clearCities = (citiesDropdown) => {
    //clears all city options so cities from other countries are not there when a user selects a different coutnry
    // let citiesDropdown = document.getElementById("cities")
    while (citiesDropdown.firstChild) {
      citiesDropdown.removeChild(citiesDropdown.firstChild);
    }
    //clears selected city when user changes country
    let cityInput = document.getElementById("input__city")
    cityInput.value = ""
  }

  const validateCountry = (e, selectedCountryOption) => {
    console.log(e)
    let cityInput = document.getElementById("input__city")
    //finds selected country option
    //let selectedCountryOption = document.querySelector(`[value="${e.target.value}"]`)

    if (selectedCountryOption) {
      document.getElementById("input__country").setCustomValidity('')
      cityInput.removeAttribute("disabled")
      return true
    } else {
      document.getElementById("input__city").setAttribute("disabled", true)
      document.getElementById("input__country").setCustomValidity('Please select a valid country')
      return false
    }
  }

  const populateCities1 = (e, selectedCountryOption, citiesDropdown) => {
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
  }

  const getArticles = () => {
    console.log(country)
    let selectedCity = document.getElementById("input__city").value
    let selectedCountry = document.getElementById("input__country").value

    if(selectedCity == ""){
      let selectedCountryId = document.querySelector(`[value="${selectedCountry}"]`).id
      console.log(selectedCountryId)
      fetch(`http://localhost:8083/articlesByCountry/${selectedCountryId}`)
        .then(response => response.json())
        .then(articles => {
          setArticles(articles)
        })
    //if city is selected, fetch articles by city
    } else {
      setCity(selectedCity)
      let selectedCityId = document.querySelector(`[value="${selectedCity}"]`).id
      console.log(selectedCityId)
      fetch(`http://localhost:8083/articlesByCity/${selectedCityId}`)
        .then(response => response.json())
        .then(articles => {
          setArticles(articles)
        })
    }
  }

  const handleCountryChange = (e) => {
    let citiesDropdown = document.getElementById("cities")
    let selectedCountryOption = document.querySelector(`[value="${e.target.value}"]`)
    clearCities(citiesDropdown)
    if (validateCountry(e, selectedCountryOption)){
      populateCities1(e, selectedCountryOption, citiesDropdown)

      setCountry(e.target.value)
      getArticles()
    } else {
      //do something
      setArticles()
      setCountry()
      document.getElementById("input__city").setAttribute("disabled", true)
      document.getElementById("input__country").setCustomValidity('Please select a valid country')
    }
  }



  return (
    <div>
      <h1>Travelmark</h1>
      <h2>{country}</h2>
      <Search handleCountryChange={handleCountryChange}/>
      <Results articles={articles} country={country} city={city}/>
    </div>
  );
}

export default App;
