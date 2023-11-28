import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { manualLogin } from '../../services/ManualLogin';
import {useDispatch} from "react-redux"
import { addAuthentication } from '../../features/Auth';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async() => {
    if (password.length <= 6) {
      alert("Please Fill Password Properly");
    } else {
      const res = await manualLogin(password, email);
      console.log(res);
      if (res.status === 201) {
        if (res.data.result.status === "Deactivate") {
          alert(
            "You dont have access to our website. Please Contact our Support Team"
          );
        } else {
          dispatch(
            addAuthentication({
              id: res.data.result.userId,
              email: res.data.result.email,
            })
          );
          setPassword("");
          setEmail("");
          navigate("/");
        }
      } else if (res.status === 200) {
        alert("You are Not a Registered User");
      } else if (res.status === 203) {
        alert("Credentials are InValid");
      }
    }
  }

  return (
    <div id="login" className="container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>Not a registered User? <Link to="/">Click here to sign in</Link></p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
