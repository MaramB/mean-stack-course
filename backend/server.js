const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

const io = require('socket.io').listen(server);
io.on('connection', (socket)=>{
  console.log("new connection is made");
  dataUpdate(socket);

  socket.on('join', function(data){
    //joining
    socket.join(data.room);
    console.log(data.user + ' joined the room : ' + data.room);
    socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
  });

  socket.on('leave', function(data){
    //leaving
    console.log(data.user + ' left the room : ' + data.room);
    socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});
    socket.leave(data.room);
  });

  socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  });

   // Handle typing event
   socket.on('typing', function(data){
    socket.broadcast.to(data.room).emit('typing', {user:data.user, message:' is typing...'});
  });

  function dataUpdate(socket) { //chart
    socket.emit('dataUpdate', Array.from({length: 8}, ()=>Math.floor(Math.random() * 40)));
    setTimeout( () => {
      dataUpdate(socket);
    }, 2000);
  };

  socket.on('forceDisconnect', function(){
    socket.disconnect(true);
});

});

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
