import React from 'react';
import './App.css';

class Box extends React.Component{
  selectBox = () => {
    this.props.selectBox(this.props.row,this.props.col)
  }

  render(){
    return(
      <div className={this.props.boxClass}
      id = {this.props.id}
      onClick = {this.selectBox}
      />
    )
  }
}

class Grid extends React.Component {
  render(){
    const width = this.props.cols * 16;
    let rowsArr = [];
    let boxClass = '';
    for (let i = 0 ; i < this.props.rows; i++){
      for (let j = 0 ; j < this.props.cols; j++){
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? 'box on': 'box off';
        rowsArr.push(
          <Box
          boxClass = {boxClass}
          key={boxId}
          boxid={boxId}
          row={i}
          col={j}
          selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div className="grid" style={{width:width}}>
       {rowsArr}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;
    //Setting the state which is the inital data it holds , with the first generation begining at zero and the gridFull key is assigned to the value of both 
    // Arrays by first filling the rows with all the elements inside of the array this.cols which will first begin with nothing 
    this.state = {
      generation: 0,
      // this is what the full grid is gonna be like we are creating an array that is as big as the rows variable and we are going to fill that with a map where 
      // we are gonna create another array which is as big as the cols variable and each element in that array is false this is ceating a 30 x 50 grid which is
      // a two dimentional array and every element is set to false every grid cell is turned off to begin with 
      gridFull : Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }
  render(){
    return (
      <div>
      <h1>The Game of Life</h1>
      <Grid
      gridFull={this.state.gridFull}
      rows={this.rows}
      cols={this.cols}
      selectBox = {this.selectBox}
      />
      <h2>Generations: {this.state.generation}</h2>
      </div>
    )
  }
}



export default App;
