import React from 'react'
import {BrowserRouter,Routes,Route } from "react-router"
import Registration from './pages/Registration'
import Login from './pages/Login'
import OTPVerification from './pages/OTPverification'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<OTPVerification />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App
