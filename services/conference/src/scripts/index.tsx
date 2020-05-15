import {App} from '@components/app'
import {resolveAtEnd} from '@models/utils'
import {connectionInfo, participants} from '@stores/index' // init store (DO NOT delete)
import React from 'react'
import ReactDOM from 'react-dom'

main()

function main() {
  const startPromise = resolveAtEnd(onStart)()
  startPromise.then(resolveAtEnd(renderDOM))
  startPromise.then(resolveAtEnd(connectConference))
}

function onStart() {
  console.log('start')
}

function renderDOM() {
  const root = document.querySelector('#root')
  ReactDOM.render(<App />, root)
}

function connectConference() {
  // TODO add code
}
