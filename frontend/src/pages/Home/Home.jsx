import React from 'react';
import { useState, useEffect, useContext } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import './Home.css';
import { getData } from '../../services/api';

import {Link} from 'react-router-dom';

// IMPORT FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import ReadMore from '../../components/ReadMore/ReadMore';
import Pagination from '../../components/Pagination/Pagination';

function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
  
    async function fetchData(){
        try{
          const posts = await getData("/post");
          
          setPosts(posts.data.result);
          
        } catch(err){
          throw new Error(err);
        }
    }
    fetchData();

  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage, setPostsPerPage] = useState(8);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  
  let currentPosts = 0;

  if(posts) {
    currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  }
  else {
    currentPosts = 0;
  }
 

  return (
    <main className="home__main">
      <section className="home__section">
        {
          currentPosts ?
          currentPosts.map (post => {
            return(
              <article className="home__article" key={post.id}>
                <div className="img">
                  <img 
                    className='post__image' 
                    src={`/img/posts/${post.image}`} 
                    alt={'post__image'} />
                </div>
                <div className="post__information">
                  <Link to={`/post/${post.id}`}>
                    <h3 className='post__title'>{post.title}</h3>
                  </Link>
                  <span className='post__time'>
                    <FontAwesomeIcon icon={faClock} />{new Date(post.created_at).toDateString()}
                  </span>
                  <ReadMore limit={150}>
                    {post.content}
                  </ReadMore>
                </div>
              </article>
            )
          })
          :
          <p>NO POST IN DB 🚫</p>
        }
        <div className="pages__posts">
          {
            posts ?
            <Pagination 
              totalPosts  = {posts.length}
              postsPerPage  = {postsPerPage}
              setCurrentPage  = {setCurrentPage}
              currentPage = {currentPage}/>
            :
            <p>There is no post Yet 🚫</p>
          }
        </div>
      </section>
      <SideBar/>
    </main>
  )
}

export default Home