import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server)


io.on('connection', socket => {
    console.log('new connection')

    socket.on('message', (body) => {
        console.log(body)
        // store in database
        
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(6)
        })
    })
})  


server.listen(4000)
console.log('server on', 4000)