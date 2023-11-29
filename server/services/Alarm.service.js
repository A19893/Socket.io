const AlarmModel = require("../models/Alarm");
var schedule = require("node-schedule");
const ioManager = require("../config/ioManager");

const createAlarmService = async (req, res) => {
  const io = ioManager.getIo();
  try {
    const AlarmData = req.body.data;
    const AlarmCreation = new AlarmModel(AlarmData);
    const CreationResponse = await AlarmCreation.save();
    // const scheduledTime = new Date(AlarmData.time);
    // const id = CreationResponse.alarmId;
    // schedule.scheduleJob(id, scheduledTime, () => {
    //   io.emit(AlarmData.userId, "Alarm goes off!!");
    // });
    return res.status(201).json({
      message: "Alarm Created Successfully",
      data: CreationResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetAlarmService = async (req, res) => {
  try {
    const userId = req.params.id;
    const Alarms = await AlarmModel.find({ userId: userId, delay:10000, isDeleted:false});
    return res.status(200).json(Alarms);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};

const DueAlarmService = async (req, res) => {
  try {
    const userId = req.params.id;
    const Alarms = await AlarmModel.find({ userId: userId, delay: { $lte: 100000 } });
    return res.status(200).json(Alarms);
  } catch (err) {
    return res.status(500).json({ error: error.message });
  }
};

const CancelAlarmService = async (req, res) => {
  // Retrieve the alarm details from the database
  const id = req.params.id;
  console.log(id);
  const alarmDetails = await AlarmModel.findById(id);
  if (alarmDetails) {
    const { alarmId } = alarmDetails;
    // Cancel the scheduled job using node-schedule
    const job = schedule.cancelJob(alarmId);
    console.log(job);
    if (job) {
      alarmDetails.isDeleted = true;
      await alarmDetails.save();
      return res.status(200).json({
        message: "Alarm Deleted Successfully!!",
      });
    } else {
      return res.status(204).json({
        message: "No alarm found right now!!",
      });
    }
  }
};
module.exports = {
  createAlarmService,
  GetAlarmService,
  CancelAlarmService,
  DueAlarmService
};
