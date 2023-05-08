import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import MainPage from "./MainPage.js";
import LoginForm from "./loginForm.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav.js";
import ItemsList from "./ItemsList.js";
import ItemForm from "./ItemForm.js";
import Cart from "./components/Cart.js";
import { useGetTokenQuery } from "./store/authApi.js";
import LandingPage from './LandingPage';
import Protected from "./utilities/Protected.js";
import Counter from "./components/Counter.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { data } = useGetTokenQuery();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Nav isLoggedIn = {data} />
      <Routes>
        <Route element={<Protected token={data}/>}>
          <Route path="/items" element={<MainPage />}/>
          <Route path="/items/new" element={<ItemForm />}/>
          {/* <Route path="/items/:id" element={<ItemDetail />}/> */}
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="/counter" element={<Counter />} />
        <Route path="login" element={<LoginForm token={ data }/>} />
        <Route path="/" element={<LandingPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
