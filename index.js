const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Novo usuário conectado');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.room = room;
    console.log(`Usuário entrou na sala: ${room}`);
  });

  socket.on('chatMessage', (msg) => {
    if (socket.room) {
      io.to(socket.room).emit('chatMessage', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

http.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});