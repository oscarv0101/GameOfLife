import React from 'react';
import './App.css';
import {ButtonToolbar} from 'react-bootstrap';

class Box extends React.Component{
  //we are using selectBox from our state only now we are entering the current row / current col 
  //because there is nothing to pass in to this.props if its
  //inside the render method                             / |
  selectBox = () => {                                   // |
    this.props.selectBox(this.props.row,this.props.col)//<-|
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
    const width = this.props.cols * 14;
    let rowsArr = [];
    let boxClass = '';
    //for loop since we are looping through a nested array
    for (let i = 0 ; i < this.props.rows; i++){
      for (let j = 0 ; j < this.props.cols; j++){
        let boxId = i + "_" + j;
        //checking if the current box is true or false with a ternary operator
        boxClass = this.props.gridFull[i][j] ? 'box on': 'box off';
        //we are pushing a box component that will contain all the information previously created into our rowsArr
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
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

class Buttons extends React.Component {



	render() {
		return (
			<div className="center">
				<ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-default" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Seed
					</button>
				</ButtonToolbar>
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
    // when we originally create the 2D array every box is set to false when we use
    // selectBox we want to change it to true
    // add the row and col as variables 
    // we begin by making a copy of the array using a helper method arrayClone so as to not update the state directly 
    // find the box that was clicked and change it to the opposite of what it was 
    // then use set state command to update the state 
  selectBox = (row,col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col]
    this.setState({
      gridFull: gridCopy
      });
  } 

  // creating a copy of 2d array , then being iterated  and changing random boxes to true 
  seed = () =>{
    let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy
		});
  }

  playButton = () => {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
  }
  pauseButton = () => {
    clearInterval(this.intervalId);

  }
  slow = () => {
		this.speed = 1000;
		this.playButton();
	}

	fast = () => {
		this.speed = 100;
		this.playButton();
	}

	clear = () => {
		var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
		this.setState({
			gridFull: grid,
			generation: 0
		});
	}

	
  //create a play function that will be the game logic .
  // use two variables the original state of the grid and then the second variable be a clone of the grid.
  // loop through the entire grid using a double for loop.
  // compute the number of neighbors a cell has by setting a variable to 0 to keep track of how many neighbors a cell has and what to do with those 
  //results.
  //Use the array of operations to use as new indexs to write less repetative code
  // Create two new variables as new index counters that will be used to update the number of neighbors each cell has.
  //write an if statement to make sure we are not out of bounds when checking the number of neighbor a cell has then updating our count variable 
  // to show how many neighbors a cell has 
  play = () => {
		let g = this.state.gridFull;
		let g2 = arrayClone(this.state.gridFull);

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    operations.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < this.rows && newJ >= 0 && newJ < this.cols) {
            count += g[newI][newJ];
          }
        });
        //checking for the cases if a cell has less than 2 neighbors and if it has more than three it dies 
        //or else if any dead cell has exactly three neighbors it comes back to life 
        if (count < 2 || count > 3) {
          g2[i][j] = 0;
        } else if (g[i][j] === 0 && count === 3) {
          g2[i][j] = 1;
        }
		  }
    }
    //updating the state with the gridclone and incrementing the generation state by 1
		this.setState({
		  gridFull: g2,
		  generation: this.state.generation + 1
		});

	}

componentDidMount(){
  this.seed();
  this.playButton();
}
  
  render(){
    return (
      <div>
      <h1>The Game of Life </h1>
      <Buttons
					playButton={this.playButton}
					pauseButton={this.pauseButton}
					slow={this.slow}
					fast={this.fast}
					clear={this.clear}
					seed={this.seed}
					
				/>
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

//creating a clone of the arrays inside of the arrays , Deep clone
function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr))
}

export default App;
