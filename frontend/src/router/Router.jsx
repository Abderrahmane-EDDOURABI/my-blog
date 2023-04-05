import React from 'react';
import {Routes, Route} from 'react-router-dom';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import PostByCategories from '../pages/PostByCategories/PostByCategories';
import PostByUser from '../pages/PostByUser/PostByUser';
import Register from '../pages/Register/Register';
import Settings from '../pages/Settings/Settings';
import Single from '../pages/Single/Single';
import Write from '../pages/Write/Write';

function Router() {

  return (
    <Routes>     
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<Single/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/write' element={<Write/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/post/category/:category' element={<PostByCategories/>}/>
        <Route path='/post/user/:user_id' element={<PostByUser/>}/>
    </Routes>
  )
}

export default Router