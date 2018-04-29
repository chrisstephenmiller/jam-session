/**
 * ACTION TYPES
 */
const GET_DRUM_GRID = 'GET_DRUM_GRID'

/**
 * INITIAL STATE
 */
const defaultDrumGrid = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

/**
 * ACTION CREATORS
 */
export const getDrumGrid = drumGrid => ({type: GET_DRUM_GRID, drumGrid})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultDrumGrid, action) {
  switch (action.type) {
    case GET_DRUM_GRID:
      return action.drumGrid
    default:
      return state
  }
}
