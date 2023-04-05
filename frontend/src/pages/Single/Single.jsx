import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { getData } from '../../services/api';
import './Single.css';
import '../../App.css';
import moment from "moment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock, faComments, faMonument, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import ReadMore from '../../components/ReadMore/ReadMore';


function Single() {
  const { id } = useParams();

  const {user} = useContext(Context);

  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [visible, setVisible] = useState(5);


  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`/post/${id}`);
    if(res.status === 201) {
      alert("Post deleted Successfully ✅");
      navigate('/');
    }
  }

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/post`, {
        title,
        content,
        user_id : post.id
      });
      if(res.status === 201) {
        alert("Post updated Successfully ✅");
        setUpdateMode(false);
      }
    } catch (error) {
      
    }
  }

  const showMoreComments = () => {
    setVisible((prevValue) => prevValue + 3);
  }

  useEffect(() => {
      async function fetchData() {
          try {
            const post = await getData(`/post/${id}`);
            const allComments = await getData(`/comment/${id}`);
            
            setPost(post.data.result);
            setComments(allComments.data.result);
            
            setTitle(post.data.result.title);
            setContent(post.data.result.content);
          } catch (error) {
            throw Error(error);
          }
      }
      fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(`/comment/add`, {
          text : newComment,
          user_id : user.result.id,
          post_id : post.id
        });
        if(res.status === 201) {
          alert("You are successfully commented the Post ✅");
          const commentToAdd = {
            text : newComment,
            userAvatar : user.result.avatar,
            username : user.result.username,
            created_at : Date.now(),
            user_id : user.result.id,
            post_id : post.id
          }
          console.log(comments);
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
    } catch (error) {
      throw Error(error);
    }
  }
    
  return (
    <main className="singlePost__main">
      <section className="singlePost__section">
        <h2>Single Post</h2>
          
          <article className="singlePost__article">
            {
              (post.image) &&(
                <>
                  <div className='singlePost__figure'>
                    <img 
                      src={`/img/posts/${post.image}`} 
                      alt={`singlePost__image`}
                      className="singlePost__image" />
                  </div>
                  <h3 className='singlePost__title'>{title}</h3>

                  <div className="singlePost__information">
                    {
                      (user && (post.Redactor === user.result.username)) ?
                      <span className="singlePost__author">
                        Posted By : You
                      </span>
                      :
                      <span className="singlePost__author">
                        Posted By : {post.Redactor}
                      </span>
                    }
                    <span className='singlePost__category'>
                      {post.CategoryName}
                    </span>
                    <span className='singlePost__time'>
                      <FontAwesomeIcon icon={faClock} />{new Date(post.created_at).toDateString()}
                    </span>
                  </div>

                  <p>{content}</p>
                </>
              )
            }
          </article>

            {
              (user) && 
              (
                <div className="singlePost__comments">
                  {
                    comments ?
                    comments.slice(0,visible).map((comment, key) => {
                        return(
                          <div className="singlePost__previousComments" key={key}>
                            <figure className='figure__previousComments'>
                              <img 
                              src={`/img/users/${comment.userAvatar}`} 
                              alt=""
                              className='commentator__avatar' />
                              <figcaption>By : {comment.username}</figcaption>
                            </figure>
                            <div className="informations">
                              {
                                <ReadMore limit={150}>{comment.text}</ReadMore>
                              }
                              <span className='comment_time'>
                                {new Date(comment.created_at).toDateString()}
                              </span>
                            </div>
                          </div>
                        )
                      })
                    :
                    <p>No comments for this Post 🚫</p>
                  }
                  <button className='btn__showMore' onClick={showMoreComments}>Show More comments ...</button>
                  {
                    <div className="singlePost__newComments">
                      <figure>
                        <img 
                          src={`/img/users/${user.result.avatar}`} 
                          alt={"user avatar"} 
                          className="commentator__avatar"/>
                        <figcaption></figcaption>
                      </figure>
                      <form 
                          className='comments__form'
                          onSubmit={handleSubmit}
                          >
                          <textarea 
                            name="new__comment" 
                            id="new__comment" 
                            required
                            placeholder='Comments ....'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}>
                          </textarea>
                          <button  
                          type='submit'
                            className='btn__comment'>
                            <FontAwesomeIcon icon={faComments}
                            />
                          </button>
                      </form>
                    </div>
                  }
                </div>
              )
            }

            {
              //IF THERE IS USERS
              user 
              ?
              (user.result.role === "admin" || post.Redactor === user.result.username) 
              ? 
              (
                //IF THE ADMIN CLICK IN UPDATE POST
                updateMode ?
                (<form 
                  className="updatePost__form">
                  <input 
                    type="text" 
                    name="updatePost__title" 
                    id="updatePost__title" 
                    value={title}
                    className = "singlePost__titleInput"
                    onChange={(e) => setTitle(e.target.value)}/>
                  <textarea
                    name="user__about" 
                    id="user__about" 
                    cols="30" 
                    rows="10"
                    value={content}
                    className = "singlePost__contentInput"
                    onChange={(e) => setContent(e.target.value)}>
                  </textarea>
                  <input 
                    className="updatePost__submit"
                    onClick={handleUpdatePost}
                    type="submit"
                    value="Update Post"/>
                </form>)
                :
                // IF ADMIN NOT CLICK IN THE UPDATE BUTTON
                  <div className="singlePost__information">
                    <div className="singlePost__actions">
                      <FontAwesomeIcon 
                        className='icons__actions' 
                        icon={faPenToSquare} onClick={() => setUpdateMode(true)}/>
                      <FontAwesomeIcon 
                        className='icons__actions' 
                        icon={faTrash} onClick={handleDelete}/>
                    </div>
                </div>
              )
              :
              //IF THE USER'S ROLE IS NOT ADMIN (HE, SHE CAN COMMENT, UPDATE DELETE OWN POST BUT NOT OTHER POSTS)
              (user.result.role !== "admin") &&
              (
                <p>You are connected not Admin User 🙂, You can comment the post but not removed or updated the Post 😉</p>
              )
              :
              //IF THE USER NOT LOGIN OR REGISTER
              (<p>You are connected as a guest 🙂, if you want comment the post you must create account and login 😉</p>)
            }
          
        </section>
      <SideBar/>
    </main>
  )
}

export default Single