import React from "react";

const Search = () => {
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
