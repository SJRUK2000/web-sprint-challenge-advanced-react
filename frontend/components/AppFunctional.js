import React, {useState, useEffect} from 'react';
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
export default function AppFunctional(props) {
  
  const [state, setState] = useState(initialState)

  const newArray = () => {

    if(state.x === 1 && state.y === 1) {
      return ['B', null, null, null, null, null, null, null, null,]}
      else if (state.x === 2 && state.y === 1){return [null, 'B', null, null, null, null, null, null, null,]}
      else if (state.x === 3 && state.y === 1){return [null, null, 'B', null, null, null, null, null, null,]}
      else if (state.x === 1 && state.y === 2){return [null, null, null, 'B', null, null, null, null, null,]}
      else if (state.x === 1 && state.y === 3){return [null, null, null, null, null, null, 'B', null, null,]}
      else if (state.x === 2 && state.y === 2){return [null, null, null, null, 'B', null, null, null, null,]}
      else if (state.x === 2 && state.y === 3){return [null, null, null, null, null, null, null, 'B', null,]}
      else if (state.x === 3 && state.y === 2){return [null, null, null, null, null, 'B', null, null, null,]}
      else if (state.x === 3 && state.y === 3){return [null, null, null, null, null, null, null, null, 'B',]}
      else { return 'how did you do that?' }

  }

  useEffect(() => setState({...state, grid: newArray()}), [state.x, state.y]);

  const moveLeft = () => {

    let counterX = state.x - 1;
    let stepCounter = state.steps + 1;

    if(state.x > 1) {
      setState({...state, x: counterX, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      setState({...state, successMessage: '', errorMessage: `You can't go left`})
    }
  }

  const moveRight = () => {

    let counterX = state.x + 1;
    let stepCounter = state.steps + 1;

    if(state.x < 3) {
      setState({...state, x: counterX, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      setState({...state, successMessage: '', errorMessage: `You can't go right`})
    }
  }
  
  const moveUp = () => {

    let counterY = state.y - 1;
    let stepCounter = state.steps + 1;

    if(state.y > 1) {
      setState({...state, y: counterY, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      setState({...state, successMessage: '', errorMessage: `You can't go up`})
    }
  }

  const moveDown = () => {

    let counterY = state.y + 1;
    let stepCounter = state.steps + 1;

    if(state.y < 3) {
      setState({...state, y: counterY, steps: stepCounter, successMessage: '', errorMessage: ''})
    } else {
      setState({...state, successMessage: '', errorMessage: `You can't go down`})
    }
  }

  const reset = () => {
    setState(initialState)
  }
  
  const changeInput = (event) => {
    const { value } = event.target
    setState ({...state, email: value})
  }

  const onSubmit = (event) => {

    event.preventDefault()

    const newData = { 'x': state.x, 'y': state.y, 'steps': state.steps, 'email': state.email }

    axios.post(url, newData)
      .then(response => {
        setState({
          ...state, 
          successMessage: [...state.successMessage, response.data.message],
          errorMessage: '',
          email: ''
        })
      })
      .catch(error => {
        console.error(error)
        setState({
          ...state, 
          successMessage: '',
          errorMessage: error.response.data.message,
          email: ''
        })
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({state.x}, {state.y})</h3>
        <h3 id="steps">You moved {state.steps} {state.steps > 1 || state.steps === 0 ? "times" : "time"}</h3>
      </div>
      <div id="grid">
        { state.grid.map(location => {
          if(location === 'B') {
            return <div className='square active'>B</div>
          } else { return <div className='square'/> }
        })}
      </div>
      <div className="info">
        <h3 id="message">{state.errorMessage}{state.successMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => moveLeft()}>LEFT</button>
        <button id="up" onClick={() => moveUp()}>UP</button>
        <button id="right" onClick={() => moveRight()}>RIGHT</button>
        <button id="down" onClick={() => moveDown()}>DOWN</button>
        <button id="reset" onClick={() => reset()}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={state.email} onChange={changeInput}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
