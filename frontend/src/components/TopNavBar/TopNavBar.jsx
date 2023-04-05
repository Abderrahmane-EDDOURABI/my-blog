import React from 'react';
import './TopNavBar.css';
import {Link, useNavigate} from 'react-router-dom';
import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import logo from '../../assets/img/logo___my_blog.png';
import logout from '../../assets/img/logout.png';

function TopNavBar() {

  const {user, dispatch} = useContext(Context); 

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
        type : "LOGOUT"
    });
    navigate('/register');
  }

  return (
    <header className='nav__header'>

        <nav className='nav__left'>
            <Link to={'/'}>
                <img className='webSite__logo' src={logo} alt={'logo__nav'} />
            </Link>
        </nav>
        
        <nav className='nav__center'>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/contact'}>Contact</Link>
            {
                user &&
                (<Link to={'/write'}>Write</Link>)
            }
        </nav>

        <nav className='nav__right'>
            {
                user ? (
                    <div className="user__settings">
                        <Link to={'/settings'}>
                            <img 
                                className='user__avatar' 
                                src={`/img/users/${user.result.avatar}`} 
                                alt={'user__avatar'} />
                        </Link>
                        <Link to={'/register'} onClick={handleLogout}>
                            <img 
                                className='logout__image'
                                src={logout} 
                                alt="logout__img" />
                        </Link>
                    </div>
                )
                :
                (
                    <div className="user__settings">
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </div>
                )
            }
        </nav>

    </header>
  )
}

export default TopNavBar;