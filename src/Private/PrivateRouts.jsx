import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'
import { PacmanLoader, RotateLoader } from 'react-spinners'

const PrivateRouts = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
   
  if (loading) {
    return <div className='h-[97vh] flex items-center justify-center'>
    <RotateLoader
  color="#54b355"
  size={25}
/>
  </div>
}

  if (!user) {
    return <Navigate to={"/login" } />
}

  return (
    <div>
      {children}
    </div>
  )
}

export default PrivateRouts
