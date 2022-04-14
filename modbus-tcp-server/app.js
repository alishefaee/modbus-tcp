const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { client, server } = require("jsmodbus")
const { Socket, Server } = require("net")

const input = new Uint16Array(1000)
const tcpServer = new Server()
const modbusServer = new server.TCP(tcpServer, {
    input: Buffer.from(input.buffer),
})

modbusServer.on('connection', function (client) {
    console.log('NNew Connection')
})

// start modbus server
tcpServer.listen(502, "192.168.1.105", () => {
    console.log('modbus server is started')

    modbusServer.on('connection', function (client) {
        console.log('New Connection')
    })

    // data init
    input[0] = 1
    input[1] = 2
    input[2] = 3

    // modbus client init
    const socket = new Socket()
    const modbusClient = new client.TCP(socket)

    socket.connect({ host: "192.168.1.105", port: 502 }, () => {
        modbusClient.writeSingleCoil(0, true)
            .then(function (resp) {
                console.log(' turn on led')
                // console.log(resp)
                // socket.end()
            }).catch(function () {
            console.error(arguments)
            socket.end()
        })

        modbusClient.readCoils(0, 8).then(function (resp) {

            // resp will look like { response : [TCP|RTU]Response, request: [TCP|RTU]Request }
            // the data will be located in resp.response.body.coils: <Array>, resp.response.body.payload: <Buffer>

            console.log(resp);
            console.log(JSON.stringify(resp));

        }, console.error);

        modbusServer.on('readCoils', function (request, response, send) {
            /* Implement your own */
            console.log('read coils triggered')
            response.body.coils[0] = 1
            response.body.coils[1] = 1

            send(response)
        })

    })

})


module.exports = app;
