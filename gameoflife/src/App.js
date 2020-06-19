import React from 'react';
import './App.css';

class Grid extends React.Component {
  render(){
    return (
      <div>
        Grid
      </div>
    )
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      generation: 0,
    }
  }
  render(){
    return (
      <div>
      <h1>The Game of Life</h1>
      <Grid/>
      <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}



export default App;
