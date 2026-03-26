import { useState } from "react"
import { useNavigate } from "react-router-dom";
import auth from "../api/PostApi";

const Register= () => {
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const handleChange =(e)=>{
    setForm({
      ...form, 
      [e.target.name]:e.target.value,
    })
  }
  const handleSubmit =async(e)=>{
    e.preventDefault();
    console.log(form);
    await auth.post("register/",form)
    console.log("Navigating to the login page")
    navigate('/login');
    
  }
  return (
    <div className="flex justify-center items-center bg-[#212f3d] min-h-screen">
    <form onSubmit={handleSubmit} className="bg-white text-slate-800 p-6 rounded-lg shadow-lg w-80 flex flex-col gap-4">
    <h2 className="text-xl font-bold text-center">Regiser</h2>
    <label htmlFor="username">Username</label>
    <input type="text" name="username" value={form.username} onChange={handleChange} className="w-full border p-2 rounded mt-1 text-slate-900 placeholder:text-slate-400"/>
    <label htmlFor="email">Email</label>
    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded mt-1 text-slate-900 placeholder:text-slate-400"/>
    <label htmlFor="text">Password</label>
    <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded mt-1 text-slate-900 placeholder:text-slate-400"/>
    <button type="submit" className="bg-[#212f3d] text-white py-2 rounded hover:bg-[#212f3d]/80">Register</button>
      
    </form>
    </div>
  )
}

export default Register
