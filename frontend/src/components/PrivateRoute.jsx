import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx"

const PrivateRoute = ({ children })=>{
  const { user, loading} = useAuth(); 
  if(loading) return <div>Loading...</div>
  if(!user) return <Navigate to="/login"/>; 
  return children;
}; 
export default PrivateRoute; 
