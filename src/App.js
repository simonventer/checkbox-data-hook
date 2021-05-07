import "./App.css";
import React, { useEffect, useState } from "react";
//import checkbox from "../src/components/checkbox";

function App() {
  const [initialState, setInitialState] = useState([]); //The useState manages a local array state, state.
  const [state, setState] = useState([]); //The useState manages a local array state, state.
  const selectedFilters = []; //checkbox filters
  const categoryFilters = [];
  //The useEffect will make a network request on component render.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        json.map((item) => {
          //console.log(item.category);
          if (categoryFilters.indexOf(item.category) === -1) {
            categoryFilters.push(item.category);
          }
          return true;
        });
        //setInitialState as an object
        setInitialState({
          items: json,
          filters: categoryFilters,
        });
        setState({
          items: initialState.items,
          filters: [],
        });
        //console.log("CategoryFilters", categoryFilters);
      })
      .catch();
  }, [state]); //dependancy

  const handleChange = (filter) => {
    var index = selectedFilters.indexOf(filter);
    if (index === -1) {
      selectedFilters.push(filter);
      console.log("Selected Filters", index, selectedFilters);
    }
    if (index !== -1) {
      selectedFilters.splice(index, 1);
      console.log("Selected Filters", index, selectedFilters);
    }
    let filteredItems = initialState.items.filter((item) => {
      //console.log(selectedFilters.indexOf(item.category));
      return selectedFilters.indexOf(item.category) !== -1;
    });

    setState({
      items: filteredItems,
      filters: selectedFilters,
    });
    /*
    let filteredItems = state.initialItems.filter(
      (item) => filters.indexOf(item.category) !== -1
    );
    console.log(filteredItems);

    if (filters.length > 0) {
      setState({ ...state, items: filteredItems });
    } else {
      setState({ ...state, items: state.initialItems });
    }
    //console.log(filter);*/
  };

  return (
    <div className="App">
      <h2>How to get multiple selected checkbox values</h2>
      <h4>React js tutorials</h4>

      <div className="filters">
        {initialState.filters &&
          initialState.filters.map((filter, index) => {
            //console.log(filter);
            return (
              <div key={index}>
                <label>{filter}</label>
                <input type="checkbox" onChange={() => handleChange(filter)} />
              </div>
            );
          })}
      </div>

      <hr />

      <div className="products">
        {state.items &&
          state.items.map((item) => {
            return <div key={item.id}>{item.price}</div>;
          })}
      </div>
    </div>
  );
}

export default App;
