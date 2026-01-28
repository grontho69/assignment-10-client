import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router'
import { PacmanLoader } from 'react-spinners'

const PrivateRouts = ({ children }) => {
  const { user, loading } = useContext(AuthContext)
   
  if (loading) {
    return <div className='h-[97vh] flex items-center justify-center'>
    <PacmanLoader
  color="#ab9fe9"
  size={15}
  speedMultiplier={3}
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
