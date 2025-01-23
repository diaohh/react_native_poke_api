import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import { FirebaseAuth } from "@/utils/FirebaseConfig";

export const useAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FirebaseAuth;

  const logIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch(err) {
      alert(err)
    } finally {
      setLoading(false);
    }
  }
  
  const register = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    } catch(err) {
      alert(err)
    } finally {
      setLoading(false);
    }
  }

  const logOut = () => auth.signOut()

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    logIn,
    logOut,
    register
  }
}
