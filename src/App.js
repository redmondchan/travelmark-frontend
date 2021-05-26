import './App.css';
import Search from './Search'
import Results from './Results'

function App() {

  function handleSubmit(e){
    e.preventDefault()
    console.log(e)
    let selectedCountry = document.getElementById("input__country").value
    let selectedCity = document.getElementById("input__city").value
    if(selectedCity == ""){
      console.log("no city")
    } else {
      console.log(selectedCity)
      console.log(selectedCity == null)
      console.log("yes city")
    }
  }

  return (
    <div>
      <h1>Travelmark</h1>
      <Search handleSubmit={handleSubmit}/>
      <Results />
    </div>
  );
}

export default App;
