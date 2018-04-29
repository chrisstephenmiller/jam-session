import React, { Component } from 'react'
import { connect } from 'react-redux'
import MIDISounds from 'midi-sounds-react';
import socket from '../socket'

class Player extends Component {

  socket = false;

  componentDidMount = () => {
    if (!this.socket) {
      this.socket = true;
      socket.on(`tick`, () => {
        this.midiSounds.playDrumsNow(this.props.drums)
        this.midiSounds.playChordNow(44, this.props.instruments, .125)
      })
    }
  }

  render() {
    return (
      <div>
      <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="app" instruments={[86, 88, 91, 93, 76, 79, 81, 84, 64, 67, 69, 72, 55, 57, 60, 62]} drums={[70, 80, 100, 175, 75, 65, 62, 52, 5, 10, 20, 45, 1, 15, 35, 55]}  />
      </div>
    )
  }
}

const mapState = state => {
  return {
    drums: state.drums,
    instruents: state.instruments
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Player)
