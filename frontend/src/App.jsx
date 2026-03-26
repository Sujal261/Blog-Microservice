import { useState } from "react"
import Posts from "./components/Posts"
import { Routes, Route, Router } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import { AuthProvider } from "./Context/AuthContext"
const App = () => {
      
  
  return (
    <AuthProvider>
    <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/home" element={<PrivateRoute><Posts/></PrivateRoute>}/>
    </Routes>
    </AuthProvider>
  )
}

export default App
