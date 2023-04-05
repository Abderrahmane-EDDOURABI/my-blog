import React from 'react';
import './Write.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useContext} from 'react';
import { getData } from '../../services/api';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Write() {

  const navigate = useNavigate();

  const {user} = useContext(Context);

  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [category_id, setCategoryId] = useState(null);


  useEffect(() => {
  
    async function fetchData(){
        try{
          const categories = await getData("/category");

          setCategories(categories.data.result);
        } catch(err){
          throw new Error(err);
        }
    }
    fetchData();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(file) {
      const data = new FormData();
      const image = Date.now() + file.name;
      data.append('name', image);
      data.append('file', file);
      try {
        await axios.post('/upload', data);
      } catch (error) {
        
      }
      try {

        if (category_id === null) {
          alert("Please select the post's category 🚫");
        }

        else {
          const dataPost = {
            title,
            content,
            image,
            category_id,
            user_id : user.result.id
          }
          const res = await axios.post('/post/add', dataPost);
          if(res.status === 201) {
            alert('POST CREATED SUCCESSFULLY ✅');
            navigate('/');
          }
        }
      } catch (error) {
        
      } 
    }
    else {
      alert("Please select a image for the post 🚫");
    }
  }

  return (
    <main className="writePost__main">
        <h2>WRITE A POST FORM</h2>
        {
          file &&
          <div className="newPost__figure">
            <figure>
              <img 
                src={URL.createObjectURL(file)} 
                alt={`newPost__image`} 
                className='newPost__image'/>
              <figcaption></figcaption>
            </figure>
          </div>
        }
        <form 
          className='writePost__form' 
          method="POST" 
          onSubmit={handleSubmit} 
          encType="multipart/form-data">
          <label htmlFor="post__img">
            <FontAwesomeIcon className='addImgPost__icon' icon={faCirclePlus} />
            Click To Add the post's image
          </label>
          <input 
            type="file" 
            name="post__img" 
            id="post__img"
            style={{display : 'none'}}
            onChange={(e) => setFile(e.target.files[0])}/>
          <input 
            type="text" 
            name="post__title" 
            id="post__title" 
            required
            placeholder='Post title'
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}/>
          <textarea 
            name="post__content" 
            id="post__content" 
            required
            cols="30" 
            rows="10" 
            placeholder="Enter you're story ..."
            onChange={(e) => setContent(e.target.value)}>
          </textarea>

          <label htmlFor="post__category">Select the post category :</label>

          <select name="post__category" id="post__category" onChange={(e) => setCategoryId(e.target.value)}>
            <option> Select category's post </option>
            {
              categories ?
              categories.map(category => {
                return(

                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>

                )
              })
              :
              <p>No categories Yet</p>
            }
          </select>

          <input type="submit" value="Publish" className='publishPost__submit' />
        </form>
        {/* {
          error && (
            <span className="error__writePost">
              We're sorry, this post Title is already Taken
            </span>
          )
        } */}
    </main>
  )
}

export default Write;