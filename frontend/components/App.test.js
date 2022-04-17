// // Write your tests here
// test('sanity', () => {
//   expect(true).toBe(false)
// })

import React from "react";
import AppClass from "./AppClass";
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

beforeEach(() => {
  render(<AppClass/>)
})

test(' Directional buttons and Coordinates appear in the DOM and render', () => {
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  const coords = document.querySelector('#coordinates')

  expect(coords).toBeInTheDocument()
  expect(right).toBeInTheDocument()
  expect(left).toBeInTheDocument()
  expect(down).toBeInTheDocument()
  expect(up).toBeInTheDocument()
})

test ('Coords properly reflect button clicks', () => {
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const coords = document.querySelector('#coordinates')

  fireEvent.click(up)
  fireEvent.click(left)
  fireEvent.click(down)
  fireEvent.click(down)

  expect(coords).toHaveTextContent('Coordinates (1, 3)')

})

test ('Steps properly reflect button clicks', () => {
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  const steps = document.querySelector('#steps')

  fireEvent.click(up)
  fireEvent.click(left)
  fireEvent.click(down)
  fireEvent.click(down)
  fireEvent.click(right)
  fireEvent.click(right)



  expect(steps).toHaveTextContent('You moved 6 times')

})

test ('Coords & Steps properly resets upon click', () => {
  const up = document.querySelector('#up')
  const down = document.querySelector('#down')
  const left = document.querySelector('#left')
  const right = document.querySelector('#right')
  const steps = document.querySelector('#steps')
  const coords = document.querySelector('#coordinates')
  const reset = document.querySelector('#reset')

  fireEvent.click(up)
  fireEvent.click(left)
  fireEvent.click(down)
  fireEvent.click(down)
  fireEvent.click(right)
  fireEvent.click(right)
  fireEvent.click(reset)


  expect(steps).toHaveTextContent('You moved 0 times')
  expect(coords).toHaveTextContent('Coordinates (2, 2)')

})

test('user can input text into the email field', () => {
  const emailField = document.querySelector('#email')
  fireEvent.change(emailField, { target: { value : 'foobar' }})
  expect(emailField).toHaveValue('foobar')
})
