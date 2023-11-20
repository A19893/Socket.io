const express = require("express");
const cors = require("cors");
const AlarmRouter = require("./routers/Alarm");
const UserRouter= require("./routers/User");
const app = express();
const connectWithDataBase = require('./config/connectWithDatabase')
const http = require("http").Server(app);
const dotenv = require("dotenv");
const ioManager = require('./config/ioManager');
dotenv.config({ path: "./.env" });


ioManager.init(http);

connectWithDataBase();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", AlarmRouter);
app.use('/user', UserRouter)
http.listen(8080, function (err) {
  if (err) console.log(err);
  console.clear();
  console.log("Server is listening on port 8080!!");
});

