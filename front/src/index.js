import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './screens/Shared/Login';
import Register from './screens/Shared/Register';
import { useEffect } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));


const RootComponent = () => {

  let navigate = useNavigate();
  const [auth, setAuth] = useState(localStorage.getItem('auth') !== null);
  const setToken = (token) => {
    setAuth({ ...auth, token: token })
  }
  const setAuthHandler = (user) => {
    localStorage.setItem("auth", JSON.stringify(user))
    setAuth(true)
    navigate(
      '/',
      {
        replace: true,
      }
    )
  }

  useEffect(() => {
    return
    setAuthHandler({
      id: 1,
      email: 'achraf@mail.com',
      role: 1,
      token: 'token'
    })
  }, [])

  return <Routes>
    {
      !auth ? <>
        <Route path='/register' element={<Register setAuth={setAuthHandler} setToken={setToken} />} />
        <Route path='/*' element={<Login setAuth={setAuthHandler} setToken={setToken} />} />
      </> : <Route path='/*' element={<App setToken={setToken} />} />
    }
  </Routes>;
}
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootComponent />
    </BrowserRouter>
  </React.StrictMode>
);
