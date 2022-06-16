import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './screens/Shared/Login';
import Register from './screens/Shared/Register';
const root = ReactDOM.createRoot(document.getElementById('root'));


const RootComponent = () => {

  let navigate = useNavigate();
  const [auth, setAuth] = useState(localStorage.getItem('auth') !== null);
  const setAuthHandler = (user) => {
    localStorage.setItem("auth", JSON.stringify({ username: user.username, role: user.role, token: user.token }))
    setAuth(true)
    navigate(
      '/',
      {
        replace: true,
      }
    )
  }

  return <Routes>
    {
      !auth ? <>
        <Route path='/register' element={<Register setAuth={setAuthHandler} />} />
        <Route path='/*' element={<Login setAuth={setAuthHandler} />} />
      </> : <Route path='/*' element={<App />} />
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
