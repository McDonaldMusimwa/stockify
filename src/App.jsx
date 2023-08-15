import { useState, useEffect } from 'react'
import './App.css'
import Login from './Components/Logins/Login';

import Dashboard from './Components/Pages/DashBoard/Dashboard';
import Inventory from './Components/Pages/Inventory/Inventory';
import Stores from './Components/Pages/ManageStores/Stores';
import Orders from './Components/Pages/Orders/Orders';
import Reports from './Components/Pages/Reports/Reports';
import Suppliers from './Components/Pages/Suppliers/Suppliers';
//import SignUpForm from './Components/Logins/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/UI/NavBar/NavBar';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("isLoggedIn");

    if (storedUserInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email,password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log(email,password)
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <main>
        {!isLoggedIn ? (<Login onLogIn={loginHandler} />

        ) : (
          <>
          <NavBar logout={logoutHandler}/>
            <Routes>
              <Route path='/' element={<Dashboard logOut={logoutHandler} />}></Route>
              <Route path='/inventory' element={<Inventory logOut={logoutHandler} />}></Route>
              <Route path='/reports' element={<Reports logOut={logoutHandler} />}></Route>
              <Route path='/suppliers' element={<Suppliers logOut={logoutHandler} />}></Route>
              <Route path='/orders' element={<Orders logOut={logoutHandler} />}></Route>
              <Route path='/stores' element={<Stores logOut={logoutHandler} />}></Route>
            </Routes>
          </>
        )}
      </main>
    </Router >
  )
}

export default App
