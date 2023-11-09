 class Connection {
    constructor(io, socket) {
      this.socket = socket;
      this.io = io;

      console.log(`⚡: ${socket.id} user just connected!`)

      socket.on("alarm-set",(data)=>{
        socket.emit("show-notify",{time: data.time})
      })
      
      socket.on('notifications', (data) => {
        console.log(data);
      });

      socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
        socket.disconnect();
      });
    }
    
    toAll(eventName, data) {
        console.log("got it")
     this.io.sockets.emit(eventName,data)
    }
  }

  function chat(io) {
    io.on('connection', (socket) => {
      new Connection(io, socket);   
    });
  };
  
module.exports = {Connection, chat};