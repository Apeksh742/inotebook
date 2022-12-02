import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Alert from './Alert'

export default function Navbar() {
  const navigate = useNavigate();
  const HandleLogut=()=>{
    localStorage.removeItem('token') 
    navigate('/login' )
  }
  return (
    <div className='sticky-top'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       
          <div className="container-fluid">
              <NavLink className="navbar-brand" to="/">iNotebook</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink className="nav-link" to="/about">About</NavLink>
                      </li>
                  </ul>
                      {!localStorage.getItem('token') ? <div className="d-flex">
                          <NavLink className="btn btn-primary" role="button" to="/login">Login</NavLink>
                          <NavLink className="btn btn-primary ms-2" role="button" to="/signup">Sign Up</NavLink>
                      </div>:
                      <a className="btn btn-primary" role="button" onClick={HandleLogut}>Logout</a> }
              </div>
          </div>
      </nav>
      <div className="container-fluid p-0"><Alert /></div>
      </div>
  )
}
