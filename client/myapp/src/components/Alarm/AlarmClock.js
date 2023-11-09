import React, { useEffect, useState } from "react";
import "./Alarm.css";
import { CancelAlarm, CreateAlarm, GetAlarm } from "../../services/CreateAlarm";
import { modifyTime } from "../../utils/modifyAlarm";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import { addAlarm, cancelAlarm, getAlarms } from "../../features/Alarm";

function AlarmClock({ socket }) {
  const [alarmTime, setAlarmTime] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authentication.userId);
  const email = useSelector((state) => state.authentication.email);
  const Alarms = useSelector((state) => state.alarms.Alarms);

  useEffect(() => {
    socket.on("show-notify", (data) => {
      handleAlarmSet(data.time);
    });
    socket.on(userId, (data) => {
      notifyAlarm(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const getSavedAlarm = async () => {
      try {
        const savedAlarms = await GetAlarm(userId);
        console.log(savedAlarms);
        dispatch(getAlarms(savedAlarms.data));
      } catch (err) {
        console.log(err);
      }
    };
    getSavedAlarm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAlarmSet = (time) => {
    console.log(time);
    const parsedDate = new Date(time);
    const options = { hour: "2-digit", minute: "2-digit" };
    const timeString = parsedDate.toLocaleTimeString([], options);
    const dateString = parsedDate.toLocaleDateString();

    enqueueSnackbar(`Alarm has been set for ${dateString} on ${timeString}`, {
      variant: "success",
      autoHideDuration: 5000,
    });
  };
  
  const handleDelete = async(id) =>{
    console.log(id)
  try {
    const response = await CancelAlarm(id);
    if (response) {
      // socket.emit(`${userId}-cancel`, { message: "Alarm Cancelled!!" });
      dispatch(cancelAlarm(id));
    }
  } catch (err) {
    console.log(err);
  }
  }
  const notifyAlarm = (data) => {
    enqueueSnackbar(data, { variant: "success", autoHideDuration: 5000 });
  };

  const setAlarm = async () => {
    console.log(alarmTime);
    const alarmDate = modifyTime(alarmTime);
    const data = {
      userId: userId,
      time: alarmDate,
      isDeleted: false,
      submittedBy: email,
    };
    try {
      const response = await CreateAlarm(data);
      if (response) {
        socket.emit("alarm-set", { time: alarmDate }); 
        dispatch(addAlarm(response.data.data));
        setAlarmTime("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="alarm-clock">
      <SnackbarProvider />
      <h1>Alarm Clock</h1>
      <label className="alarm-label">Select Alarm Time:</label>
      <input
        type="datetime-local"
        className="alarm-time-input"
        placeholder="e.g., 2023-11-05T13:30:00"
        required
        style={{ marginRight: "2rem", padding: ".6rem" }}
        // value={alarmTime}
        onChange={(e) => setAlarmTime(e.target.value)}
      />
      <button className="set-alarm-button" onClick={setAlarm}>
        Set Alarm
      </button>
      <div className="alarm-status1">
      {Alarms.map((item, idx) => {
        const timestamp = new Date(item.time);
        const day = timestamp.toLocaleString('en-us', { weekday: 'long' });
        const date = timestamp.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });
        const time = timestamp.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        return (
          <div key={idx} className="alarm-item">
            {`${day}, ${date}, ${time}`}
            <button className="delete-button" onClick={()=>handleDelete(item._id)}>Delete</button>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default AlarmClock;
