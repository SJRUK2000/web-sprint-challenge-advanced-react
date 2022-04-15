import React from 'react';
import axios from 'axios';

const url = 'http://localhost:9000/api/result';

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  successMessage: '',
  errorMessage: '',
  email: '',
  grid: [
    null, null, null,
    null, 'B', null,
    null, null, null
  ],

}
export default class AppClass extends React.Component{
  
  state = initialState;

  newArray = () => {

    if(this.state.x === 1 && this.state.y === 1) {
      return ['B', null, null, null, null, null, null, null, null,]}
      else if (this.state.x === 2 && this.state.y === 1){return [null, 'B', null, null, null, null, null, null, null,]}
      else if (this.state.x === 3 && this.state.y === 1){return [null, null, 'B', null, null, null, null, null, null,]}
      else if (this.state.x === 1 && this.state.y === 2){return [null, null, null, 'B', null, null, null, null, null,]}
      else if (this.state.x === 1 && this.state.y === 3){return [null, null, null, null, null, null, 'B', null, null,]}
      else if (this.state.x === 2 && this.state.y === 2){return [null, null, null, null, 'B', null, null, null, null,]}
      else if (this.state.x === 2 && this.state.y === 3){return [null, null, null, null, null, null, null, 'B', null,]}
      else if (this.state.x === 3 && this.state.y === 2){return [null, null, null, null, null, 'B', null, null, null,]}
      else if (this.state.x === 3 && this.state.y === 3){return [null, null, null, null, null, null, null, null, 'B',]}
      else { return 'how did you do that?' }

  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.x !== this.state.x || oldState.y !== this.state.y) {
      this.setState({...this.state, grid: this.newArray()})
    } else {
      console.log('current')
    }
  }

   moveLeft = () => {

    let counterX = this.state.x - 1;
    let stepCounter = this.state.steps + 1;

    if(this.state.x > 1) {
      this.setState({...this.state, x: counterX, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      this.setState({...this.state, successMessage: '', errorMessage: `You can't go left`})
    }
  }

   moveRight = () => {

    let counterX = this.state.x + 1;
    let stepCounter = this.state.steps + 1;

    if(this.state.x < 3) {
      this.setState({...this.state, x: counterX, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      this.setState({...this.state, successMessage: '', errorMessage: `You can't go right`})
    }
  }
  
   moveUp = () => {

    let counterY = this.state.y - 1;
    let stepCounter = this.state.steps + 1;

    if(this.state.y > 1) {
      this.setState({...this.state, y: counterY, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      this.setState({...this.state, successMessage: '', errorMessage: `You can't go up`})
    }
  }

   moveDown = () => {

    let counterY = this.state.y + 1;
    let stepCounter = this.state.steps + 1;

    if(this.state.y < 3) {
      this.setState({...this.state, y: counterY, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      this.setState({...this.state, successMessage: '', errorMessage: `You can't go down`})
    }
  }

   reset = () => {
    this.setState(initialState)
  }
  
   changeInput = (event) => {
    const { value } = event.target
    this.setState ({...this.state, email: value})
  }

   onSubmit = (event) => {

    event.preventDefault()

    const newData = { 'x': this.state.x, 'y': this.state.y, 'steps': this.state.steps, 'email': this.state.email }

    axios.post(url, newData)
      .then(response => {
        this.setState({
          ...this.state, 
          successMessage: [...this.state.successMessage, response.data.message],
          errorMessage: '',
          email: ''
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          ...this.state, 
          successMessage: '',
          errorMessage: error.response.data.message,
          email: ''
        })
      })
  }

  render() { 

    const {className} = this.props

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          { this.state.grid.map(location => {
            if(location === 'B') {
              return <div className='square active'>B</div>
            } else { return <div className='square'/> }
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.errorMessage}{this.state.successMessage}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLeft()}>LEFT</button>
          <button id="up" onClick={() => this.moveUp()}>UP</button>
          <button id="right" onClick={() => this.moveRight()}>RIGHT</button>
          <button id="down" onClick={() => this.moveDown()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.changeInput}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}