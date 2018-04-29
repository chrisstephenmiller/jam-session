import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import { getInstrumentGrid, getInstruments } from '../store';

class InstrumentGrid extends Component {

  socket = false;

  instruments = [86, 88, 91, 93, 76, 79, 81, 84, 64, 67, 69, 72, 55, 57, 60, 62]

  componentDidMount = () => {
    const { postInstrumentGrid } = this.props
    if (!this.socket) {
      this.socket = true;
      socket.on(`newInstrumentGrid`, newInstrumentGrid => postInstrumentGrid(newInstrumentGrid))
    }
  }

  onClick = event => {
    this.toggleState(event.target.id)
  }

  onKey = event => {
    if (event.repeat) return
    const { code } = event
    if (!(this.keyMap[code] >= 0)) return
    this.toggleState(this.keyMap[code])
  }

  toggleState = id => {
    const { postInstrumentGrid, instrumentGrid, postInstruments } = this.props
    const newInstrumentGrid = [...instrumentGrid]
    newInstrumentGrid[id] = !newInstrumentGrid[id]
    postInstruments(this.instruments.filter((drum, idx) => newInstrumentGrid[idx]))
    postInstrumentGrid(newInstrumentGrid)
    socket.emit(`sendinstrumentGrid`, newInstrumentGrid)
  }

  keyMap = {
    Digit7: 0,
    Digit8: 1,
    Digit9: 2,
    Digit0: 3,
    KeyU: 4,
    KeyI: 5,
    KeyO: 6,
    KeyP: 7,
    KeyJ: 8,
    KeyK: 9,
    KeyL: 10,
    Semicolon: 11,
    KeyM: 12,
    Comma: 13,
    Period: 14,
    Slash: 15,
  }

  render() {
    document.onkeydown = this.onKey
    document.onkeyup = this.onKey
    const { instrumentGrid } = this.props
    const rows = [[-1, 4], [3, 8], [7, 12], [11, 16]]
    return (
      <div>
        <div id="drum-grid">
          <table>
            <tbody>
              {rows.map(row => {
                return (
                  <tr key={row}>
                    {instrumentGrid.map((cell, idx) => {
                      if (idx > row[0] && idx < row[1]) {
                        return (
                          <td
                            key={row + idx}
                            id={idx}
                            className={cell ? `alive` : ``}
                            onClick={this.onClick}
                          />
                        )
                      }
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    instrumentGrid: state.instrumentGrid,
  }
}

const mapDispatch = dispatch => {
  return {
    postInstrumentGrid: instrumentGrid => {
      dispatch(getInstrumentGrid(instrumentGrid))
    },
    postInstruments: instruments => {
      dispatch(getInstruments(instruments))
    }
  }
}

export default connect(mapState, mapDispatch)(InstrumentGrid)
