import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import { getDrumGrid, getDrums } from '../store';

class DrumGrid extends Component {

  socket = false;

  drums = [70, 80, 100, 175, 75, 65, 62, 52, 5, 10, 20, 45, 1, 15, 35, 55]

  componentDidMount = () => {
    const { postDrumGrid } = this.props
    if (!this.socket) {
      this.socket = true;
      socket.on(`newDrumGrid`, newDrumGrid => postDrumGrid(newDrumGrid))
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
    const { postDrumGrid, drumGrid, postDrums } = this.props
    const newDrumGrid = [...drumGrid]
    newDrumGrid[id] = !newDrumGrid[id]
    postDrums(this.drums.filter((drum, idx) => newDrumGrid[idx]))
    postDrumGrid(newDrumGrid)
    socket.emit(`sendDrumGrid`, newDrumGrid)
  }

  keyMap = {
    Digit1: 0,
    Digit2: 1,
    Digit3: 2,
    Digit4: 3,
    KeyQ: 4,
    KeyW: 5,
    KeyE: 6,
    KeyR: 7,
    KeyA: 8,
    KeyS: 9,
    KeyD: 10,
    KeyF: 11,
    KeyZ: 12,
    KeyX: 13,
    KeyC: 14,
    KeyV: 15,
  }

  render() {
    document.onkeydown = this.onKey
    document.onkeyup = this.onKey
    const { drumGrid } = this.props
    const rows = [[-1, 4], [3, 8], [7, 12], [11, 16]]
    return (
      <div>
        <div id="drum-grid">
          <table>
            <tbody>
              {rows.map(row => {
                return (
                  <tr key={row}>
                    {drumGrid.map((cell, idx) => {
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
    drumGrid: state.drumGrid,
  }
}

const mapDispatch = dispatch => {
  return {
    postDrumGrid: drumGrid => {
      dispatch(getDrumGrid(drumGrid))
    },
    postDrums: drums => {
      dispatch(getDrums(drums))
    }
  }
}

export default connect(mapState, mapDispatch)(DrumGrid)
