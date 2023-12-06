// Import necessary modules and components
import Login from '../Logins/Login'
import { Outlet } from 'react-router-dom';


const RootAuth = () => {
    return (
        <>


            <Login />
            <main>
                <Outlet />
            </main>
        </>
    );
};





export default RootAuth;
