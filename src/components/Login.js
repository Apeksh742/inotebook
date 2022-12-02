import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/auth/AuthContext'
import Alert from './Alert'
import AlertContext from '../contexts/alert/AlertContext'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { showAlert } = alertContext
  const { name, loginUser } = authContext
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await loginUser(credentials);
    console.log("Local Storage token after login"+ localStorage.getItem("token"));
    if (response) {
      console.log("Login success");
      navigate("/");
    }
    else {
      showAlert("Invalid credentials", "danger", "Failed");
      console.log("Login failed");
    }
  }
  useEffect(() => {
    document.title = "iNotebook - Login";
  })
  return (
    <>
      <Alert />
      <div className='login d-flex justify-content-center'>
        <form onSubmit={onSubmit} className='login-form bg-white text-dark p-4 rounded col-md-4 col-xl-3'>
          <div className="h3 text-center mb-3 ">Login</div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder='Enter your email' name='email' id="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
          </div>
          <div className="password">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' placeholder='Enter your password' onChange={onChange} value={credentials.password} id="password" />
          </div>
          <button type="submit" className="container my-4">LOGIN</button>
          <div className="container">
            <p className="text-center">Or Sign Up Using</p>
            <h6 className="text-center"><NavLink to="/signup">SIGN UP</NavLink></h6>
          </div>
        </form>
      </div>
    </>


  )
}
