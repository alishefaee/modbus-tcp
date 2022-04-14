export const turnOffLED = (client, socket) => {
    return new Promise(async (resolve, reject) => {
        client.writeSingleCoil(0, false)
            .then(function (resp) {
                // console.log(resp)
                resolve(resp)
                // socket.end()
            }).catch(function () {
                reject(arguments)
            console.error(arguments)
            socket.end()
        })
    })
}

export const turnOnLED = (client, socket) => {
    return new Promise(async (resolve, reject) => {
        client.writeSingleCoil(0, true)
            .then(function (resp) {
                // console.log(resp)
                resolve(resp)
                // socket.end()
            }).catch(function () {
                reject(arguments)
            console.error(arguments)
            socket.end()
        })
    })
}

export const blinkingLED = (client, socket) => {
    let status = true
    setInterval(function () {
        status = !status
        client.writeSingleCoil(1, status)
            .then(function (resp) {
                // console.log(resp)
                // socket.end()
            }).catch(function () {
            console.error(arguments)
            socket.end()
        })
    }, 1000)
}

export const blisnkingLED = (client, socket) => {

    setInterval(function () {
        client.readCoils(start, count)
            .then(function (resp) {
                // console.log(resp)
                // socket.end()
            }).catch(function () {
            console.error(arguments)
            socket.end()
        })
    }, 200)
}