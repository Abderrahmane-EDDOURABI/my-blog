import axios from 'axios';
import React from 'react';
import {useRef, useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import './Login.css';

function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState(false);

  const {dispatch, user, isFetching} = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type : "LOGIN_START"
    })
    try {
      const res = await axios.post('/user/login', {
        email : emailRef.current.value,
        password : passwordRef.current.value,
      });
      dispatch({
        type : "LOGIN_SUCCESS", 
        payload:res.data
      });
      if(res.status === 201) {
        alert("Login successfully ✅");
        navigate('/');
      }
    } catch (error) {
      dispatch({
        type : "LOGIN_FAILURE",
      });
      alert("Wrong Username OR password !!! 😬");
    }
  }

  return (
    <main className="login__main">
      <h1>LOGIN PAGE</h1>
       <form className='login__form' method="POST" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="user__email" 
            id="user__email" 
            placeholder='Email'
            autoFocus={true}
            ref={emailRef}/>
          <input 
            type="password" 
            name="user__password" 
            id="user__password" 
            placeholder='Password'
            ref={passwordRef}
            autoComplete={"on"}/>
          <input type="submit" value="Login" className='user__login' />
          <div className="create__account">
            <span>Don't have an account ? <Link to={'/register'}>Create One</Link></span>
          </div>
        </form>
    </main>
  )
}

export default Login