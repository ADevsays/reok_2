// PrivateRoute.js
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
  if (!false) {
    return <Navigate to="/login" />;
  }
  return <Route {...props} element={element} />;
};

export default PrivateRoute;