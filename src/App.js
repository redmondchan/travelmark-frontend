import './App.css';
import Search from './Search'
import Results from './Results'

function App() {

  function handleSubmit(e){
    e.preventDefault()
    console.log("submit")
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
