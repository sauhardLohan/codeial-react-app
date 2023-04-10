import { useState } from 'react';
import styles from '../styles/login.module.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {useNavigate, Navigate} from 'react-router-dom';
import { useAuth } from '../hooks';
const  Signup = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmPassword,setConfirmPassword]=useState('');
  const [signingUp,setSigningUp]=useState(false); 
  const auth = useAuth(); 
  const navigate=useNavigate();
  // console.log(auth);

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    setSigningUp(true);
    let error = false;
    if(!name || !email || !password || !confirmPassword)
    {
      toast.error('Please fill all the fields', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true, 
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      error = true;
    }
    else if(password!==confirmPassword)
    {
      toast.error('Make sure password and confirm password matches', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      error = true;
    }
    if (error) {
      return setSigningUp(false);
    }
    console.log(name,email,password,confirmPassword);
    const response = await auth.signup(name,email,password,confirmPassword);
    console.log(response);
    if (response.success) {
      navigate('/login');
      setSigningUp(false);
      toast.success('User registered successfully, please login now', {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });

      
    } else {
      toast.error(response.message, {
        position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      
    }

    setSigningUp(false);
  }
  if(auth.user)
  {
    return <Navigate to="/"/>
  }
  return (

    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader} > Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input placeholder="Email" type="email" autoComplete="new-password" 
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        />
      </div>
      <div className={styles.field}>
        <input placeholder="Password" type="password"  
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>
      <div className={styles.field}>
        <input placeholder="Confirm password" type="password"  
       value={confirmPassword}
       onChange={(e)=>{setConfirmPassword(e.target.value)}}
        />
      </div>
      
      <div className={styles.field}>
        <button disabled={signingUp}>
          {
            signingUp?'Signing up...':'Sign up'
          }
        </button>
      </div>
    </form>
  

  );
};

export default Signup;
