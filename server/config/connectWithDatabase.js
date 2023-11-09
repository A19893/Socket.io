const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connection to database is successful');
    })
    .catch(() => {
      console.log('Connection Error');
    });
};
module.exports = connectDatabase;
