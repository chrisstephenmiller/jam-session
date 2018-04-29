import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getBeat } from '../store'
import socket from '../socket'

class Metronome extends Component {

  socket = false;

  componentDidMount = () => {
    if (!this.socket) {
      this.socket = true;
      socket.on(`tick`, beat => {
        this.props.fetchBeat(beat)
      })
    }
  }

  render() {
    return (
      <div>
        <h3 onClick={this.start}>{this.props.metronome}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    metronome: state.metronome,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBeat: beat => {
      dispatch(getBeat(beat))
    }
  }
}

export default connect(mapState, mapDispatch)(Metronome)
