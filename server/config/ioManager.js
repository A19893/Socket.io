// ioManager.js
const socketIo = require('socket.io');

let io;

function init(server) {
    io = socketIo(server, {
        cors: {
          origin: "http://localhost:3000", // Replace with your desired origin
        },
      });

  //Add this before the app.get() block
io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    
  
    socket.on("alarm-set",(data)=>{
      socket.emit("show-notify",{time: data.time})
    })
  
    socket.on('notification', (data) => {
      console.log(data)
    })
  
    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      socket.disconnect();
    });
  });
}

function getIo() {
  if (!io) {
    throw new Error('Socket.io has not been initialized yet.');
  }
  return io;
}

module.exports = {
  init,
  getIo,
};


