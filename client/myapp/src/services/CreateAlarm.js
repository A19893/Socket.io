import axios from "axios";

export const CreateAlarm = async (data) => {
  console.log(data);
  return axios.post(process.env.REACT_APP_PORT, { data });
};

export const GetAlarm = async (id) => {
  return axios.get(`${process.env.REACT_APP_PORT}/${id}`);
};

export const UpdateAlarm = async (id) => {
  return axios.patch(`${process.env.REACT_APP_PORT}/${id}`,{isDeleted:true});
};

export const DueAlarm = async (id) => {
  return axios.get(`${process.env.REACT_APP_PORT}/due/${id}`);
};

export const CancelAlarm = async (id) => {
  console.log(id);
  return axios.delete(`${process.env.REACT_APP_PORT}/${id}`);
};
