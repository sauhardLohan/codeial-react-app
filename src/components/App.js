
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks';
import { Home, Login ,Signup,Settings,UserProfile} from '../pages';
import { Navbar } from './';
import { getItemFromLocalStorage,LOCALSTORAGE_TOKEN_KEY } from '../utils';
function PrivateRoute ({children}){
const auth=useAuth();
console.log(auth);
const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)
if(userToken && !auth.user)
{
  return 
}
return auth.user? children:<Navigate to="/login"/>;
}         
const Page404 = () => {
  return <h1>404</h1>;
};
function App() {
  
  return (
    <>
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/user/asdasd" element={<UserInfo />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* <Route path="/settings" element={auth.user ? <Settings/>:<Navigate to="/login" />} /> */}
        <Route path="/settings" element={<PrivateRoute ><Settings/></PrivateRoute>} />
        <Route path="/user/:userId" element={<PrivateRoute ><UserProfile/></PrivateRoute>} />
        {/* <Route path="/user/:userId" element={<UserProfile/>} /> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  </div>
  <ToastContainer
    position="top-left"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
  </>
  );
}

export default App;
