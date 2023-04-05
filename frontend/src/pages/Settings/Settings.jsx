import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import './Settings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {

  const {user, dispatch} = useContext(Context);

  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [about, setAbout] = useState("");

  const navigate = useNavigate();
  
  const deleteAccount = async ()=> {

    const res = await axios.delete(`/user/${user.result.id}`);
    if(res.status === 201) {
      alert("Account Deleted Successfully ✅");
      dispatch({
        type : "LOGOUT"
      });
      navigate('/register');
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    dispatch({
      type : "UPDATE_START"
    });

    if(file) {
      const data = new FormData();
      const avatar = Date.now() + file.name;
      data.append("name", avatar);
      data.append("file", file);
      try {
        await axios.post("/upload/user", data);
      } catch (err) {
      }
      try {
        const dataUser = {
          password,
          avatar,
          about,
          id: user.result.id
        }
        const res = await axios.put("/user", dataUser);
        dispatch({ 
          type: "UPDATE_SUCCESS", 
          payload: res.data
        });
        if(res.status === 201) {
          alert("You're account is updated successfully ✅");
          dispatch({
            type : "LOGOUT"
          });
          navigate("/login");
        }
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
      }
    }
    else {
      try {
        const dataUser = {
        password,
        avatar : user.result.avatar,
        about,
        id: user.result.id
      }
      const res = await axios.put("/user", dataUser);

      dispatch({ 
        type: "UPDATE_SUCCESS", 
        payload: res.data
      });

      console.log(res.data);

      if(res.status === 201) {
        alert("You're account is updated successfully ✅");
        dispatch({
          type : "LOGOUT"
        });
        navigate("/login");
      }
      } catch (error) {
        dispatch({ type: "UPDATE_SUCCESS" });
        // alert("Username or Email Already Taken 🚫");
      }
    }
  }

  return (
    <main className="settings__main">
      <section className="settings__section">
        <h2>Update you're account</h2>
        {
          file ? 
            <div className="previous__userAvatar__figure">
              <figure>
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`previous__userAvatar`} 
                  className='previous__userAvatar'/>
                <figcaption></figcaption>
              </figure>
            </div>
          :
          <div className="previous__userAvatar__figure">
            <figure>
              <img 
                src={`/img/users/${user.result.avatar}`} 
                alt={`previous__userAvatar`} 
                className='previous__userAvatar'/>
              <figcaption></figcaption>
            </figure>
          </div>
        }
        <form 
          className='settings__form'
          method='POST'
          onSubmit={handleSubmit}
          encType="multipart/form-data">
          <label htmlFor="user__avatar" className='label_addAvatar'>
            <FontAwesomeIcon className='addImgPost__icon' icon={faCirclePlus} />
            Click To Add you're new avatar
          </label>
          <input 
            type="file" 
            name="user__avatar" 
            id="user__avatar"
            style={{display : 'none'}}
            onChange={(e) => setFile(e.target.files[0])}/>
          <input 
            type="text" 
            name="user__username" 
            id="user__username"
            value={user.result.username}
            disabled={true}/>
          <input 
            type="email" 
            name="user__email" 
            id="user__email"
            value={user.result.email}
            disabled={true}/>
          <input 
            type="password" 
            name="user__password" 
            id="user__password" 
            required
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete={'on'}
            placeholder={"Password"}/>
          <textarea 
            name="user__about" 
            id="user__about"
            required 
            cols="30" 
            rows="10" 
            placeholder={"About Us ..."}
            onChange={(e) => setAbout(e.target.value)}>
          </textarea>
          <input 
            type="submit" 
            value= "Upload profile" 
            className='user__submit'/>
        </form>
        <div className="userProfile__actions">
          <h2 
            className='delete__account' 
            onClick={deleteAccount}>
            Delete you're Account
          </h2>
        </div>
      </section>
      <SideBar/>
    </main>
  )

}

export default Settings