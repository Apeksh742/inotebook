import React, { useContext } from 'react'
import AlertContext from '../contexts/alert/AlertContext'

export default function Alert() {
    const alertContext=useContext(AlertContext)
    const {alert}=alertContext
  return (
      alert && <div className={`alert alert-${alert.type}`}  role="alert">
          <strong className='text-capitalize'>{alert.category}: </strong>
        
       {alert.message}
      {alert.type != "danger" && " successfully"}
      </div>
  )
}
