import React from 'react'
import { useState, useRef } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

  // const usernameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();

  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const res = await axios.post('/user/register', {
        username,
        email,
        password
      });
      if(res.status === 201) {
        alert("Account created Successfully ✅");
        navigate('/login');
      }
      else {
        alert("Account Already existing with those information 🚫");
      }
    } catch (error) {
      alert("Account Already existing with those information 🚫");
    }
  }

  return (
    <main className="register__main">
      <h1>REGISTER PAGE</h1>
      <form className='register__form' method="POST" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="user__username" 
            id="user__username" 
            placeholder='Username'
            required
            autoFocus={true}
            onChange={e=>setUserName(e.target.value)}/>
          <input 
            type="email" 
            name="user__email" 
            id="user__email" 
            placeholder='Email'
            required
            onChange={e=>setEmail(e.target.value)}/>
          <input 
            type="password" 
            name="user__password" 
            id="user__password" 
            placeholder='Password'
            required         
            onChange={e=>setPassword(e.target.value)}
            autoComplete={'on'}/>
          <input type="submit" value="Register" className='user__submit' />
          <div className="already__member">
            <span>Already Member ? 
              <Link to={'/login'}>
                Authenticate you
              </Link>
            </span>
          </div>
        </form>
    </main>
  )
}

export default Register