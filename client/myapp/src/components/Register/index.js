import React, { useState } from 'react';
import './index.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuthentication } from '../../features/Auth';
import { manualRegister } from '../../services/ManualLogin';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async(e) => {
    e.preventDefault();
     if (password.length <= 6 || password.length > 10) {
      alert(
        "Password should be greater than 6 characters and less than 9 characters!!"
      );
    } else {
      const res = await manualRegister(password, email);
      if (res.status === 201) {
        dispatch(
          addAuthentication({
            id: res.data.creation.userId,
            email: res.data.creation.email,
          })
        );
      setPassword("");
      setEmail("");
        navigate("/alarm");
      } else if (res.status === 203) {
        alert("Email already exists");
        // navigate("/login");
      }
      else if(res.status===202){
        alert("Phone Number already exists!!");
      }
    }

  }

  return (
    <div id="register" className="container">
      <h2>Register</h2>
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
      <p>Already logged in? <Link to="/login">Click here to log in</Link></p>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
