import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Alarms:[],
}

const AlarmSlice = new createSlice({
    name: "Data",
    initialState,
    reducers:{
        addAlarm: (state, action)=>{
            console.log(action)
            state.Alarms= [...state.Alarms, action.payload];
        },
        getAlarms: (state,action) => {
            state.Alarms = action.payload;
        },
        cancelAlarm: (state,action)=> {
            state.Alarms = state.Alarms.filter((item)=>{
                return item._id!==action.payload;
            })
        }
    }
})

export const {addAlarm, getAlarms, cancelAlarm} = AlarmSlice.actions;

export default AlarmSlice.reducer;