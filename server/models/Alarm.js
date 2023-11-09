const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;

const AlarmSchema = new Schema({
  submittedAt: {
    type: Date,
    default: new Date().toISOString(),
    required: true,
  },
  submittedBy: {
    type: String,
    required: true,
    match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  },
  userId: {
    type: String,
  },
  time: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  alarmId: {
    type: String,
    unique: true,
  },
});

AlarmSchema.pre("save", function (next) {
  this.alarmId = uuidv4();
  next();
});

const AlarmModel = mongoose.model("Alarms", AlarmSchema);
module.exports = AlarmModel;
