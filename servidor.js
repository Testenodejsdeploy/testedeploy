const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let contagem = 0

io.on('connection', (socket) => {
  console.log("Um usuário conectado")

  socket.emit('inicio', contagem)

  socket.on('incrementar', () => {
    contagem++
    io.emit('atualizar', contagem)
  })

  socket.on('disconnect', () => {
    console.log("Usuário desconectado")
  })
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})
