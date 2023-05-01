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


function App() {
  const [items, setItems] = useState([]);
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/items`;
  //     // console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     // console.log("------- hello? -------");
  //     let data = await response.json();
  //     // console.log(data)
  //     setItems(data);
  //     // if (response.ok) {
  //     //   console.log("got launch data!");
  //     //   setLaunchInfo(data.launch_details);
  //     // } else {
  //     //   console.log("drat! something happened");
  //     //   setError(data.message);
  //     // }
  //   }
  //   getData();
  // }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="items">
          <Route index element={<ItemsList />} />  
          <Route path="new" element={<ItemForm />} />
        </Route>
        <Route path="login" element={<LoginForm />} />
        <Route path="cart" element={<Cart />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
