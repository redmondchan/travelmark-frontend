import { useState } from 'react';
import './App.css';
import Search from './Search'
import Results from './Results'

function App() {

  const [articles, setArticles] = useState();

  function handleSubmit(e){
    e.preventDefault()
    console.log(e)
    let selectedCountry = document.getElementById("input__country").value
    let selectedCity = document.getElementById("input__city").value
    if(selectedCity == ""){
      let selectedCountryId = document.querySelector(`[value="${selectedCountry}"]`).id
      console.log(selectedCountryId)
      fetch(`http://localhost:8083/articlesByCountry/${selectedCountryId}`)
        .then(response => response.json())
        .then(articles => {
          console.log(articles)
          setArticles(articles)
        })
    } else {
      let selectedCityId = document.querySelector(`[value="${selectedCity}"]`).id
      console.log(selectedCityId)
      fetch(`http://localhost:8083/articlesByCity/${selectedCityId}`)
        .then(response => response.json())
        .then(articles => {
          console.log(articles)
          setArticles(articles)
          console.log({articles})
        })
    }
  }

  return (
    <div>
      <h1>Travelmark</h1>
      <Search handleSubmit={handleSubmit}/>
      <Results articles={articles}/>
    </div>
  );
}

export default App;
