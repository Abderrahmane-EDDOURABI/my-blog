import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data', name, email, message);
    try {
      const res = await axios.post('/contact', {
        name,
        email,
        message
      });
      if (res.status === 201) {
        alert("Message sending successfully ✅");
        navigate("/");
      }

    } catch (error) {
    }
  }

  return (
    <main className="contact__main">
      <h1>Contact Us ...</h1>
      <form 
        action="" 
        method="post" 
        className="contact__form"
        onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="contact__name" 
          id="contact__name"
          placeholder='Name'
          required
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <input 
          type="email" 
          name="contact__email" 
          id="contact__email"
          placeholder='Email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <textarea 
            name="message__contact" 
            id="message__contact" 
            placeholder="You're message ..."
            cols="30" 
            rows="10"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}>
          </textarea>
          <input type="submit" value="Contact Us ..." />
      </form>
    </main>
  )
}

export default Contact