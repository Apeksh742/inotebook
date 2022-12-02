import React from 'react'
import AuthContext from './AuthContext'

const AuthState = (props)=> {
    const HOST = "http://localhost:5000"
    const headersList = {
        'Content-Type': 'application/json',
    }
    const loginUser= async (credentials)=>{
        
        let response = await fetch(`${HOST}/api/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: headersList
        });
        let data = await response.json();
        if(data.success){
            localStorage.removeItem("token");
            localStorage.setItem("token",data.token)
            
            return true;
        }
        else{
            return false;
        }
    }
    const signUpUser= async (userInfo)=>{
        let response = await fetch(`${HOST}/api/auth/addUser`, {
            method: "POST",
            body: JSON.stringify(userInfo),
            headers: headersList
        });
        let data = await response.json();
        if (data.success) {
            localStorage.removeItem("token");
            localStorage.setItem("token", data.token)
            return true;
        }
        else {
            return false;
        }
    }
  return (
    <AuthContext.Provider value={{loginUser, signUpUser }}>
        {props.children}
    </AuthContext.Provider>
  );
}
export default AuthState
