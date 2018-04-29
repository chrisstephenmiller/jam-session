import React, { Component } from 'react'
import { connect } from 'react-redux'
import socket from '../socket'
import Metronome from './metronome';
import DrumGrid from './drum-grid';
import InstrumentGrid from './instrument-grid';
import Player from './player';

class All extends Component {

  socket = false;

  componentDidMount = () => {
    if (!this.socket) {
      this.socket = true;
    }
  }

  render() {
    return (
      <div>
        <Metronome />
        <div style={{ display: `flex` }}>
          <DrumGrid />
          <InstrumentGrid />
        </div>
        <Player />
      </div>
    )
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
  }
}

export default connect(mapState, mapDispatch)(All)
