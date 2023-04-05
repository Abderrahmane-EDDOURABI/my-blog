import React from 'react';
import './Footer.css';
import logo from '../../assets/img/logo___my_blog.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData } from '../../services/api';

//LOGOs IMAGES
import facebook from '../../assets/img/facebook__logo.png';
import instagram from '../../assets/img/instagram__logo.png';
import linkedin from '../../assets/img/linkedIn__logo.png';
import tiktok from '../../assets/img/tiktok__logo.png';

function Footer() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
    
        async function fetchData(){
            try{
            const posts = await getData("/post/fp");
            
            setPosts(posts.data.result);
            
            } catch(err){
            throw new Error(err);
            }
        }
        fetchData();

    }, []);

  return (
    <footer>
        
        <section className="footer__links">

            <div className="footer__logo">
                <img src={logo} alt="footer__logo" className='footer__logo' />
            </div>

            <div className="footer__information">

                <div className='footer__blog'>
                    <h2>Might interest you ...</h2>
                    {
                        posts ?
                        posts.map(post => {
                            return(
                                <Link to={`/post/${post.id}`}>
                                    {post.title}
                                </Link>
                            )
                        })
                        :
                        <p>There is no post yet 🚫</p>
                    }
                </div>

                <div className='footer__contact'>
                    <h2>Contact</h2>
                    <span>Tel : 06-00-00-00-00</span>
                    <span>Email : myblog@gmail.com</span>
                    <span>Address : 00 Rue de ....</span>
                </div>
                
                <div className='footer__customer'>
                    <h2>Customer Care</h2>
                    <Link to={"/login"}>Login/Register</Link>
                    <Link to={"#"}>FAQs</Link>
                    <Link to={"#"}>Affiliate</Link>
                </div>

            </div>


        </section>

        <section className="footer__legal">

            <div className="footer__rights">
                <span>©2023 All rights deserved ❤️</span>
                <Link to={"#"}>License</Link>
            </div>

            <div className="footer__social">
                <Link to={"https://www.instagram.com"} className="social__link"> 
                    <img src={instagram} alt="instagram__logo"
                        className='social_icon' /> 
                </Link>
                <Link to={"https://www.facebook.com"} className="social__link"> 
                    <img src={facebook} alt="facebook__logo"
                        className='social_icon' />
                </Link>
                <Link to={"https://www.linkedin.com"} className="social__link"> 
                    <img src={linkedin} alt="linkedin__logo"
                        className='social_icon' />
                </Link>
                <Link to={"https://www.tiktok.com"} className="social__link"> 
                    <img src={tiktok} alt="tiktok__logo"
                        className='social_icon' />
                </Link>
            </div>
            
        </section>

    </footer>
  )
}

export default Footer