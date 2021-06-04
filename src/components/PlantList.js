import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    display: [],
    filter: ''
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  componentDidMount() {
    axios
    .get('http://localhost:3333/plants')
    .then(res => {
      console.log(res);
      this.setState({
        ...this.state, 
        plants: res.data,
        display: res.data
      })
      });
  }

  filterInput = (evt) => {
    this.setState({
      filter: evt.target.value
    })
  }
  submit = (evt) => {
    evt.preventDefault();
    const temp = [...this.state.plants];
    const filtered = temp.filter( plant => {
      if(plant.name.toLowerCase().includes(this.state.filter.toLowerCase())){
        return plant;
      }
    })
    this.setState({ display: filtered });
  }

  render() {
    return (
      <main className="plant-list">
      <form>
        <div className="filter-input">
          <input type="text" onChange={this.filterInput} placeholder="Filter by plant name..." />
          <button type="submit" onClick={this.submit}>Submit</button>
        </div>
      </form>
        {this.state?.display?.map((plant) => (
          <div className="plant-card" key={plant.id} data-testid="plant-card">
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
