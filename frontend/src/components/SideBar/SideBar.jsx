import React from 'react';
import { useState, useEffect } from 'react';
import { getData } from '../../services/api';
import './SideBar.css';
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context.js';
import axios from 'axios';

//LOGOs IMAGES
import facebook from '../../assets/img/facebook__logo.png';
import instagram from '../../assets/img/instagram__logo.png';
import linkedin from '../../assets/img/linkedIn__logo.png';
import tiktok from '../../assets/img/tiktok__logo.png';
import ReadMore from '../ReadMore/ReadMore';



function SideBar() {

  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  //  

  const navigate = useNavigate();

  const handleToDate = async (e) => {
    setToDate(e.target.value);
  }

  const handleFromDate = async (e) => {
    setFromDate(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const postData = {
          fromDate,
          toDate
        }
        const res = await axios.post(`/post/postDate`, postData);
        if(res.status === 201) {
          alert("Filter apply successfully ✅");
        }
      } catch (err) {
        alert("Filter no apply 🚫")
      }
    // alert("To Date : " + toDate + " from Date : " + fromDate);
  }

  const {user} = useContext(Context);

	useEffect(()=>{
		async function fetchCategories(){
			try {
				const categories  = await getData("/category");
				
				setCategories(categories.data.result);
			} catch (error) {
				throw Error(error);
			}
		}
		fetchCategories();
    
	}, []);

  return (
    <aside className="side__bar">
        <div className="aboutMe__sideBar">
          <h2>About Me</h2>
          {
            user ?
            <ReadMore limit={150}>
              {user.result.about}
            </ReadMore>
            :
            <p>
              You are connected as a Host, you can only read the posts. Good Reading 🙂
              Authenticate you or Sign Up to Write or update your'e posts 👍
            </p>
          }
        </div>

        <div className="myPost__sideBar">
          <h2>My Posts</h2>
          {
            user ?
            <Link to={`/post/user/${user.result.id}`}>
              Display All My posts
            </Link>
            :
            <p>
              You are connected as a Host, you can only read the posts. Good Reading 🙂
              Authenticate you or Sign Up to Write or update your'e posts 👍
            </p>
          }
          
        </div>

        <div className="categories__sideBar">
          <h2>Categories</h2>
          {
            categories?
            categories.map(category => {
              return(
                <div className='categories__list' key={category.id}>
                  <Link to={`/post/category/${category.name}`}>
                    {
                      category.name
                    }
                  </Link>
                </div>
              )
            })
            :
            <p>NO CATEGORIES YET 🚫</p>
          }
        </div>
        {/* <div className="postDate__sideBar">
          <h2>Search post by Date : </h2>
          {
            <form
              method='ACTION'
              className="filterByDate__post"
              onSubmit={handleSubmit}>
              <label htmlFor="fromDate__post">Year : </label> */}
              {/* <input 
                type="date" 
                name="fromDate__post" 
                id="fromDate__post"
                onChange={handleFromDate}
                required
              />
              <label htmlFor="toDate__post">To Date : </label>
              <input 
                type="date" 
                name="toDate__post" 
                id="toDate__post" 
                onChange={handleToDate}
                required
              /> */}
              {/* <input 
                type="submit" 
                value="Search"/>
            </form>
          }
        </div> */}
        <div className="followUs__sideBar">
          <h2>Follow Us</h2>
          <div className="social__links">
            <Link to={`https://www.instagram.com/`}>
              <figure>
                <img src={instagram} alt="" />
                <figcaption>Instagram Logo</figcaption>
              </figure>
            </Link>
            <Link to={`https://www.facebook.com/`}>
              <figure>
                <img src={facebook} alt="" />
                <figcaption>Facebook Logo</figcaption>
              </figure>
            </Link>
            <Link to={`https://www.linkedin.com/`}>
              <figure>
                <img src={linkedin} alt="" />
                <figcaption>LinkedIn Logo</figcaption>
              </figure>
            </Link>
            <Link to={`https://www.tiktok.com/fr/`}>
              <figure>
                <img src={tiktok} alt="" />
                <figcaption>Tiktok Logo</figcaption>
              </figure>
            </Link>
          </div>
        </div>
    </aside>
  )
}

export default SideBar