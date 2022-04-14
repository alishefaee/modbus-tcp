import { Server } from "socket.io"

let io = new Server()
const socketApi = {
    io: io
}

io.on('connection',(socket)=>{
    console.log('client connected:', socket.id)

    socket.join('modbus-room')

    socket.on('app-server', data=>{
        console.log('**************')
        console.log(data)
        io.to('modbus-room').emit('modbus-client', data)
    })

    socket.on('disconnect',(reason)=>{
        console.log(reason)
    })
})

export default socketApi