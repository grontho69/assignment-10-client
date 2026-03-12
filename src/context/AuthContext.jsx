import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile 
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import api from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserNameAndPhoto = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const refreshUser = async () => {
    if (!auth.currentUser) return;
    try {
      const profileRes = await api.get('/users/profile');
      const roleRes = await api.get('/users/role');
      const backendUser = profileRes.data;
      const backendRole = roleRes.data.role;
      
      setUser({
        ...auth.currentUser,
        name: backendUser.name || auth.currentUser.displayName,
        photoURL: backendUser.photoURL || auth.currentUser.photoURL,
        role: backendRole || 'user',
        dbId: backendUser._id
      });
    } catch (e) {
      console.error("Manual sync error:", e);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem('token', token);
          
          // Step 6: Fetch role from backend
          const profileRes = await api.get('/users/profile');
          const roleRes = await api.get('/users/role');
          const backendUser = profileRes.data;
          const backendRole = roleRes.data.role;

          console.log("Sync Login - Role:", backendRole);
          
          setUser({
            ...currentUser,
            name: backendUser.name || currentUser.displayName,
            photoURL: backendUser.photoURL || currentUser.photoURL,
            role: backendRole || 'user',
            dbId: backendUser._id
          });
        } catch (e) {
          console.error("Initial sync error:", e);
          setUser({ ...currentUser, role: 'user' });
        }
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, [auth]);

  const authInfo = {
    user,
    setUser,
    loading,
    loginUser,
    registerUser,
    signInWithGoogle,
    logoutUser,
    updateUserNameAndPhoto,
    refreshUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};
