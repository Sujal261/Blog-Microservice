import { createContext, useContext, useState, useEffect } from "react";
import auth from "../api/PostApi.jsx"
const AuthContext = createContext()

export const AuthProvider = ({ children })=>{
  const [user, setUser]= useState(null); 
  const [loading ,setLoading] = useState(true); 

  useEffect(()=>{
    auth.get("/me/")
    .then(res => setUser(res.data)) 
    .catch(()=> setUser(null))
    .finally(()=> setLoading(false));
  } ,[]);
  const login = async (form)=>{
    const {data} = await auth.post("/login/" ,form); 
    setUser(data.user);
  };
  const logout = async ()=>{
    await auth.post("/logout/"); 
    setUser(null)

    
  }; 
  return (
    <AuthContext.Provider value ={{user ,login, logout, loading}}>
    {children}
    </AuthContext.Provider>
  )
}
export const useAuth = ()=>{
  return useContext(AuthContext);
};
