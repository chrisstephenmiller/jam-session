import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import metronome from './metronome'
import drums from './drums'
import drumGrid from './drum-grid'
import instruments from './instruments'
import instrumentGrid from './instrument-grid'
import sequencer from './sequencer'

const reducer = combineReducers({ user, metronome, drums, instruments, drumGrid, instrumentGrid, sequencer })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './metronome'
export * from './drums'
export * from './drum-grid'
export * from './instruments'
export * from './instrument-grid'
export * from './sequencer'
