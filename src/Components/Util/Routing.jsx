//import propTypes from 'prop-types'
import { Route, Navigate } from 'react-router-dom';

const AuthProtectedRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated by looking for a token in localStorage
  const isLoggedIn = localStorage.getItem('token');

  return (
    <Route
      // Spread the remaining properties (e.g., path, caseSensitive) onto the Route component
      {...rest}
      // Render the specified component if the user is authenticated; otherwise, navigate to the login page
      element={isLoggedIn ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default AuthProtectedRoute;
/*
AuthProtectedRoute.propTypes = {
    
}
*/