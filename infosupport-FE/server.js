
const app = require('express')();
const http = require('http').createServer(app)



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
  console.log(socket.id, "is connected");
    socket.on('message', (msg) => {
      io.emit('message-broadcast', msg);
    })

});

http.listen(3000, () =>{
  console.log('listening on *:3000')

})
