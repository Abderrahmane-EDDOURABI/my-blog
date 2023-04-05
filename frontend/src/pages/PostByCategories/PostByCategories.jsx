import React from 'react';
import { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../../services/api';
import './PostByCategories.css';
// IMPORT FONT AWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import ReadMore from '../../components/ReadMore/ReadMore';
import SideBar from '../../components/SideBar/SideBar';
import Pagination from '../../components/Pagination/Pagination';

function PostByCategories() {
  const { category } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
        try {
          const posts = await getData(`/post/category/${category}`);
          
          setPosts(posts.data.result);

          console.log(posts);
        } catch (error) {
          throw Error(error);
        }
    }
    fetchPost();
}, [category]);

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

    <main className="postByCategory__main">
      <section className="postByCategory__section">
        <h2>POSTS Category :  {category}</h2>
        {
          currentPosts ?
          currentPosts.map(
            post => {
              return (
                <article className="postByCategory__article" key={post.id}>
                  <div className="postByCategory__figure">
                    <figure>
                      <img className='postByCategory__image' src={`/img/posts/${post.image}`} alt={'post__image'} />
                      <figcaption></figcaption>
                    </figure>
                  </div>
                  <div className="postByCategory__information">
                    <Link to={`/post/${post.id}`}>
                      <h3 className='postByCategory__title'>{post.title}</h3>
                    </Link>
                    <span className='postByCategory__time'>
                      <FontAwesomeIcon icon={faClock} />{new Date(post.created_at).toDateString()}
                    </span>
                    <ReadMore>
                      {post.content}
                    </ReadMore>
                  </div>
                </article>
              )
            }
          )
          :
          <h2>No posts in {category} 🚫</h2>
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

export default PostByCategories;