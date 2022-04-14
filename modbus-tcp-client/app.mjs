import express from 'express'
import morgan from 'morgan'
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//functions
import {getDeviceName} from './functions/readInput.mjs'
import {readDI, readDO} from './functions/readCoil.mjs'
import {turnOnLED,turnOffLED,blinkingLED} from './functions/writeCoil.mjs'

import Modbus from 'jsmodbus'
import net from 'net'
import {io} from 'socket.io-client'
import {log} from "debug";

const modbusSocket = new net.Socket()
const client = new Modbus.client.TCP(modbusSocket, 0x0)

const options = {
    'host' : '192.168.1.105',
    'port' : 502,
    'debug': true
}



let appSocket = io.connect('http://localhost:3000');

appSocket.on('connect', function () {
    console.log('connected:', appSocket.id)
    modbusSocket.connect(options)
    modbusSocket.on('connect', function () {


        console.log("modbusSocket is connected")

        setTimeout(function () {
            turnOnLED(client, modbusSocket).then(resp=>{
                console.log('LED is turned on')
                appSocket.emit('app-server', resp)
            })
        }, 1000)

        // readDI(client)
        // readDO(client)
        // turnOffLED(client,modbusSocket)

        // blinkingLED(client,modbusSocket)
        // getDeviceName(client)

    });
});

appSocket.on('modbus-client', (data) => console.log(data))

appSocket.on('connect_error', () => {
    setTimeout(() => appSocket.connect(), 5000)
})

appSocket.on('disconnect', () => console.log('server disconnected'))

export default app;
