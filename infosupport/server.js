
const app = require('express')();
const http = require('http').createServer(app)
const server = require('http').createServer();


let options = {
  allowUpgrades: true,
  transports: [ 'polling', 'websocket' ],
  pingTimeout: 9000,
  pingInterval: 3000,
  httpCompression: true,
  cors:true,
  origins:["http://127.0.0.1:5347"]
};

const io = require('socket.io')(http, options);

app.get('/', (req, res) => res.send('hello!'));

io.on('connection', (socket) => {
  console.log("user connected");
  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message-broadcast', msg);
  })
});

http.listen(3000, () =>{
  console.log('listening on *:3000')
})
