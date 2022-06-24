import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './screens/Shared/Login';
import Register from './screens/Shared/Register';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));


const RootComponent = () => {

  let navigate = useNavigate();
  const [auth, setAuth] = useState(localStorage.getItem('auth'));
  const setToken = (token) => {
    setAuth({ ...auth, token: token })
  }
  const setAuthHandler = (user) => {


    localStorage.setItem("auth", JSON.stringify(user))

    setAuth(user)
    navigate(
      '/',
      {
        replace: true,
      }
    )
  }
  const logout = () => {
    localStorage.clear();
    window.location.href = "/"
  }


  useEffect(() => {


    // const getData = async () => {

    //   const { data } = await axios.get('http://localhost:9090/tickets', { headers: { 'Authorization': 'Basic ' + btoa(`admin1@mail.com:password`) } })
    //   console.log(data);
    // }
    // getData();

    const a = JSON.parse(localStorage.getItem('auth'))

    console.log("auth", a)
    if (a !== null)
      setAuth(a)
  }, [])

  return <Routes>
    {
      !auth ? <>
        <Route path='/register' element={<Register setAuth={setAuthHandler} setToken={setToken} />} />
        <Route path='/*' element={<Login setAuth={setAuthHandler} setToken={setToken} />} />
      </> : <Route path='/*' element={<App setToken={setToken} logout={logout} auth={auth} />} />
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
