import {React} from "react"
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import {useEffect,useState,useCallback} from "react"
import { Signup } from "./pages/signup"
import { Signin } from "./pages/signin"
import {SendMoney} from "./pages/send"
import {Dashboard} from "./pages/dashboard"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
