import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import { getSequencer, getBeat } from '../store';

class Sequencer extends Component {

  socket = false;

  componentDidMount = () => {
    if (!this.socket) {
      this.socket = true;
    }
  }

  onClick = event => {
    const id = event.target.id.split(',')
    this.toggleState(id)
  }

  toggleState = id => {
    const { sequencer, postSequencer } = this.props
    const newSequencer = [...sequencer]
    newSequencer[id[0]][id[1]] = !newSequencer[id[0]][id[1]]
    postSequencer(newSequencer)
  }

  render() {
    const { sequencer, metronome } = this.props
    return (
      <div>
        <div id="sequencer">
          <table>
            <tbody>
              {sequencer.map((row, rIdx) => {
                return (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => {
                      return (
                        <td
                          key={cIdx}
                          id={[rIdx, cIdx]}
                          className={`${cell ? `alive` : ``} ${cIdx === metronome - 1 ? `active` : ``}`}
                          onClick={this.onClick}
                        />
                      )
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
    sequencer: state.sequencer,
    metronome: state.metronome,
  }
}

const mapDispatch = dispatch => {
  return {
    postSequencer: sequencer => {
      dispatch(getSequencer(sequencer))
    }
  }
}

export default connect(mapState, mapDispatch)(Sequencer)
