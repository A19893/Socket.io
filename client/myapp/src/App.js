import "./App.css";
import AlarmClock from "./components/Alarm/AlarmClock";
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useSelector } from "react-redux";
const socket = socketIO.connect("http://localhost:8080");

function App() {
  const Auth=useSelector((state)=>state.authentication.isAuth)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
         { Auth && <Route path="/alarm" element={<AlarmClock socket={socket}/>} />}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
