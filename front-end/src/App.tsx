import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/User/Register';
import useUser from './store/loggin';
import Login from './pages/User/Login';
import ProfileView from './pages/User/ProfileView';
import BuyPlan from './pages/User/BuyPlan';
import DashboardEmployee from './pages/Employee/DashboardEmployee';

function App() {
  const {user} = useUser();
  console.log(user)
  return (
    <Router>
      <Routes>
        <Route path='/employee' element={user?.is_employee ? <DashboardEmployee/> : <Navigate to={"/login"}/>}/>
        <Route path='/plan' element={user ? <BuyPlan/> : <Navigate to={"/login"}/>}/>
        <Route path='/' element={user ? (user.is_employee ? <Navigate to="/employee"/> : <ProfileView/>) : <Navigate to="/login"/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/otro" element={<h1>Hola mundo, otro</h1>} />
      </Routes>
    </Router>
  );
}

export default App;