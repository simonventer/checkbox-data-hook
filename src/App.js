import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [state, setState] = useState([]); //The useState manages a local array state, state.
  const categoryFilters = [];
  //The useEffect will make a network request on component render.
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        json.map((item) => {
          // get unique categories for filters
          if (categoryFilters.indexOf(item.category) === -1) {
            categoryFilters.push(item.category);
          }
          return categoryFilters;
        });
        setState({
          initial: {
            //setInitialState as an object
            items: json, //initial items
            filters: categoryFilters,
          },
          items: json,
          filters: [],
        });
      })
      .catch();
  }, []); //dependancy

  const handleChange = (filter) => {
    // set filters to the filters we have in our state
    var selectedFilters = state.filters;
    // remove or add filters
    var index = selectedFilters.indexOf(filter);
    if (index === -1) {
      selectedFilters.push(filter);
    } else {
      selectedFilters.splice(index, 1);
    }

    var filteredItems = [];
    // if there are no filters, return all the products
    if (selectedFilters.length == 0) {
      filteredItems = state.initial.items;
    } else {
      // filter products array based on our filters array
      filteredItems = state.initial.items.filter(function (item) {
        //looping through item
        //filter returns new array
        return this.indexOf(item.category) !== -1; //filter = to boolean check
      }, selectedFilters);
    }
    // set state to show new products based on selected filters
    setState({ ...state, items: filteredItems, filters: selectedFilters });
  };

  return (
    <div className="App">
      <h2>Simon's Product page of filtering filters that filters products</h2>
      <h4>React js tutorials</h4>

      <div className="header">
        <div className="filters">
          {state.initial &&
            state.initial.filters &&
            state.initial.filters.map((filter, index) => {
              //console.log(filter);
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onChange={() => handleChange(filter)}
                  />
                  <label>{filter}</label>
                </div>
              );
            })}
        </div>
        {state.items && state.initial.items && (
          <div className="range">
            Showing: {state.items.length} of {state.initial.items.length}
          </div>
        )}
      </div>

      <hr />

      <div className="products">
        {state.items &&
          state.items.map((item) => {
            return (
              <div key={item.id}>
                <h4>{item.category}</h4>
                <div className="image-holder">
                  <img src={item.image} />
                </div>
                <h3>{item.title.substr(0, 30) + "..."}</h3>
                <p>{item.description.substr(0, 100) + "..."}</p>
                <strong>${item.price}</strong>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
