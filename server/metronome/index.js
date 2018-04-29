let ticking = false;

const tempoToInterval = tempo => {
    return 60000 / tempo
}

const startTick = (tempo, func) => {
    if (!ticking) {
        ticking = true;
        return setInterval(func, tempoToInterval(tempo))
    }
}

module.exports = startTick