/*
import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import Root from "./Components/Pages/Root";
import ErrorPage from "./Components/Pages/Error/ErrorPage";
import Dashboard from "./Components/Pages/DashBoard/Dashboard";
import Inventory from "./Components/Pages/Inventory/Inventory";
import Reports from "./Components/Pages/Reports/Reports";
import Suppliers from "./Components/Pages/Suppliers/Suppliers";
import Orders from "./Components/Pages/Orders/Orders";
import Shipments from "./Components/Pages/Shipments/shipments";
import AddShipment from "./Components/Pages/Shipments/AddShipment/AddShipment";
import AddOrder from "./Components/Pages/Orders/AddOrder/AddOrder";
import AddSupplier from "./Components/Pages/Suppliers/AddSupplier/AddSupplier";
//import Login from './Components/Logins/Login';
import SignUpForm from "./Components/Logins/SignUp";
import AddProduct from "./Components/Pages/Inventory/AddProduct/AddProduct";
import RootAuth from "./Components/Pages/RootAuth";
import Login from "./Components/Logins/Login";
import { useState } from "react";
import {action} from '../src/Components/Services/Auth'
function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    //
  };

  const logInHandler=({formData})=>{
    action(formData)
    setIsLoggedIn(true)
  }

  // Define the authenticated routes
  const AuthenticatedRoutes = [
    { path:"/", element: <Dashboard logOut={logoutHandler} /> },
    { path: "inventory", element: <Inventory logOut={logoutHandler} />, },
    { path: "reports", element: <Reports logOut={logoutHandler} /> },
    { path: "suppliers", element: <Suppliers logOut={logoutHandler} /> },
    { path: "orders", element: <Orders logOut={logoutHandler} /> },
    { path: "shipments", element: <Shipments logOut={logoutHandler} /> },
    { path: "add-shipment", element: <AddShipment logOut={logoutHandler} /> },
    { path: "add-order", element: <AddOrder logOut={logoutHandler} /> },
    { path: "add-supplier", element: <AddSupplier /> },
    { path: "add-product", element: <AddProduct /> },
  ];


  const router = createBrowserRouter([
    {
      path: "auth",
      element: <RootAuth />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login onLogIn={logInHandler}/> },
        { path: "sign-up", element: <SignUpForm /> },
      ],
    },

    {
      path: "/",
      element: <Root logoutHandler={logoutHandler} />,
      errorElement: <ErrorPage />,
      children: isLoggedIn ? AuthenticatedRoutes : null,
    },
    {
      path: "*",
      element: <Navigate to="/auth" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

*/
import { useState } from 'react';
import './App.css'
import Login from './Components/Logins/Login';
//import SignUp from './Components/Logins/SignUp'
import { createBrowserHistory } from 'history';
import Dashboard from './Components/Pages/DashBoard/Dashboard';
import Inventory from './Components/Pages/Inventory/Inventory';
import Shipments from './Components/Pages/Shipments/shipments'
import Orders from './Components/Pages/Orders/Orders';
import Reports from './Components/Pages/Reports/Reports';
import Suppliers from './Components/Pages/Suppliers/Suppliers';
import AddShipment from './Components/Pages/Shipments/AddShipment/AddShipment';
import AddOrder from './Components/Pages/Orders/AddOrder/AddOrder';
//import SignUpForm from './Components/Logins/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/UI/NavBar/NavBar';
//import logout from '../src/Components/Services/Auth'
import action from './Components/Services/Auth'
const history = createBrowserHistory();
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {

    localStorage.removeItem('token')
    setIsLoggedIn(false)
  };

  const loginHandler = async (formData) => {
    try {
      // Assuming action returns a response with a token upon successful authentication
      const response = await action(formData);
  
      if (response && response.token) {
        // Store the token in local storage
        localStorage.setItem('token', response.token);
        // Update the state to reflect the user's authenticated status
        setIsLoggedIn(true);
      } else {
        // Handle authentication failure (e.g., show an error message)
        console.error('Authentication failed');
      }
    } catch (error) {
      // Handle any errors that occur during the authentication process
      console.error('Authentication error:', error);
    }
  };

  return (
    <Router history={history}>
      <main>
        {!isLoggedIn ? (<Login onLogIn={loginHandler} />

        ) : (
          <>
            <NavBar logout={logoutHandler} />
            <Routes>
              <Route path='/' element={<Dashboard logOut={logoutHandler} />}></Route>
              <Route path='/inventory' element={<Inventory logOut={logoutHandler} />}></Route>
              <Route path='/reports' element={<Reports logOut={logoutHandler} />}></Route>
              <Route path='/suppliers' element={<Suppliers logOut={logoutHandler} />}></Route>
              <Route path='/orders' element={<Orders logOut={logoutHandler} />}></Route>
              <Route path='/shipments' element={<Shipments logOut={logoutHandler} />}></Route>
              <Route path='/add-shipment' element={<AddShipment logOut={logoutHandler} />}></Route>
              <Route path='/add-order' element={<AddOrder logOut={logoutHandler} />}></Route>
              
            </Routes>
          </>
        )}
      </main>
    </Router >
  )
}

export default App


