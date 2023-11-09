const { createAlarmService, GetAlarmService, CancelAlarmService } = require("../services/Alarm.service");


const createAlarm = async(req,res)=>{
const response = createAlarmService(req,res);
return response;
}

const getAlarm = async(req,res)=>{
    const response = GetAlarmService(req,res);
    return response;
}

const deleteAlarm = async(req,res)=>{
    const response = CancelAlarmService(req,res);
    return response;
}
    
module.exports={
    createAlarm,
    getAlarm,
    deleteAlarm
}