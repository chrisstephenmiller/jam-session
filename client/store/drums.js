/**
 * ACTION TYPES
 */
const GET_DRUMS = 'GET_DRUMS'

/**
 * INITIAL STATE
 */
const defaultDrums = [];

/**
 * ACTION CREATORS
 */
export const getDrums = drums => ({type: GET_DRUMS, drums})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultDrums, action) {
  switch (action.type) {
    case GET_DRUMS:
      return action.drums
    default:
      return state
  }
}
