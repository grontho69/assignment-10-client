import React, { useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { useState } from 'react'
import { auth } from '../firebase/Firebase.Config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { signOut } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { sendEmailVerification } from 'firebase/auth';


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading , setLoading]= useState(true)

console.log(auth)

  const createUserWithEmailAndPasswordFunc = (email,password) => {
   return createUserWithEmailAndPassword(auth, email, password)
  }
  const signInWithEmailAndPasswordFunc = (email,password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithPopupFunc = () => {
      return  signInWithPopup(auth, provider)
  }
  const signOutFunc = () => {
   return signOut(auth)
 }
   
  const sendPasswordResetEmailFunc = (email) => {
    return  sendPasswordResetEmail(auth, email)
  }

  const updateProfileFunc = (displayName,photoURL) => {
      return updateProfile(auth.currentUser, {
            displayName , photoURL
      
          })
  }

  const sendEmailVerificationFunc = () => {
  return sendEmailVerification(auth.currentUser)
}
  
  const authInfo = {
    user,
    setUser,
    createUserWithEmailAndPasswordFunc,
    signInWithEmailAndPasswordFunc,
    signInWithPopupFunc,
    signOutFunc,
    sendPasswordResetEmailFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    loading,
    setLoading
    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        // Fetch role from backend
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'https://eco-report-server.vercel.app';
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: currUser.email,
              name: currUser.displayName,
              photoURL: currUser.photoURL
            }),
            credentials: 'include'
          });
          const data = await response.json();
          setUser({ ...currUser, ...data.user });
        } catch (error) {
          console.error("Auth sync failed", error);
          setUser(currUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
 

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
