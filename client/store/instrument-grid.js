/**
 * ACTION TYPES
 */
const GET_INSTRUMENT_GRID = 'GET_INSTRUMENT_GRID'

/**
 * INITIAL STATE
 */
const defaultInstrumentGrid = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

/**
 * ACTION CREATORS
 */
export const getInstrumentGrid = instrumentGrid => ({type: GET_INSTRUMENT_GRID, instrumentGrid})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultInstrumentGrid, action) {
  switch (action.type) {
    case GET_INSTRUMENT_GRID:
      return action.instrumentGrid
    default:
      return state
  }
}
