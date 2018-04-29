const metronome = require('../metronome')

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    let beat = 0;
    metronome(120, () => {
        beat = (beat % 16) + 1
        socket.broadcast.emit(`tick`, beat)
        console.log(beat)
    })

    socket.on(`sendDrumGrid`, newDrumGrid => {
      socket.broadcast.emit(`newDrumGrid`, newDrumGrid)
    })
    
    socket.on(`sendInstrumentGrid`, newDrumGrid => {
      socket.broadcast.emit(`newInstrumentGrid`, newDrumGrid)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
