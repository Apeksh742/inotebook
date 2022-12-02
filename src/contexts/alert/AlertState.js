import React from 'react'
import AlertContext from './AlertContext'

export default function AlertState(props) {
  const [alert, setAlert] = React.useState(null);
  const showAlert = (message, type, category) => {
    setAlert({
        message,
        type,
        category
    })
    setTimeout(() => {
        setAlert(null)
    }, 3000);
    }
  return (
    <AlertContext.Provider value={{alert, showAlert}}>
        {props.children}
    </AlertContext.Provider>
  )
}
