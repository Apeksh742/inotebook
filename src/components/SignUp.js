import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/alert/AlertContext';
import AuthContext from '../contexts/auth/AuthContext';
import Alert from './Alert';

export default function SignUp() {
    const authContext = useContext(AuthContext);
    const alertContext=useContext(AlertContext)
    const { showAlert } = alertContext
    const { signUpUser } = authContext;
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", cpassword: "" })

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.password === userInfo.cpassword) {
            if (await signUpUser(userInfo)) {
                navigate("/");

            } else {
                alert("Signup failed");
            }
        } else {
            showAlert("Password and Confirm Password do not match", "danger", "Failed");
        }
    }
    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        document.title = "iNotebook - Sign Up";
    })
    return (
        <><Alert />
        <div className='login d-flex justify-content-center'>
                <form onSubmit={onSubmit} className='login-form bg-white text-dark p-4 rounded col-md-4 col-xl-3'>
                <div className="h3 text-center mb-3 ">Sign Up</div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' onChange={onChange} value={userInfo.name} id="name" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" value={userInfo.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
                        title='Your password must be minimum 8 characters long, should contain at-least 1 Uppercase letter, 1 Lowercase, 1 Numeric and 1 special character'
                        onChange={onChange} value={userInfo.password} required id="password" />
                </div>
                <div className="">
                    <label htmlFor="cPassword" className="form-label"> Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' onChange={onChange} value={userInfo.cpassword} required id="cPassword" />
                </div>
                <button type="submit" className="container my-4">SIGN UP</button>
                <div className="container">
                    <p className="text-center">Already have an account</p>
                    <h6 className="text-center"><NavLink to="/login">LOG IN</NavLink></h6>
                </div>
            </form>
        </div>
        </>
    )
}
