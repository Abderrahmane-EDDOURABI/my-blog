import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ReadMore from '../../components/ReadMore/ReadMore';
import SideBar from '../../components/SideBar/SideBar';
import { getData } from '../../services/api';
import './About.css';

function About() {

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins(){
      try {
        const admins = await getData(`/user`);
        setAdmins(admins.data.result);
        
      } catch (error) {
        
      }
    }
    fetchAdmins();
  }, []);

  return (
    <main className="about__main">
      <section className="ourStory__section">
        <h2>Our Story</h2>
        <article className='blog__story'>
          <h3>Our Start</h3>
          <ReadMore limit={1500}>
              Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. 
              Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de 
              texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, 
              sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, 
              et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker."
              On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même. 
              L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, 
              et en tout cas comparable avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut, 
              et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction. 
              Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'oeil, voire des phrases embarassantes).
          </ReadMore>
        </article>
      </section>
      <div className="div__about">
        <section className="admins__section">
          <h2>Our Admin Teams</h2>
            {
              admins ?
              admins.map((admin) => {
                return(
                  <article className="blog__admins" key={admin.id}>
                    <div className='img'>
                      <img 
                        src={`/img/users/${admin.avatar}`} 
                        alt=""
                        className='admin__image' />
                    </div>
                    <div className="admin__information">
                      <h3 className='admin__name'>{admin.username}</h3>
                      <ReadMore limit={150}>
                        {admin.about}
                      </ReadMore>
                    </div>
                  </article>
                )
              })
              :
              <p>No admins for this WebSite 🚫</p>
            }
        </section>
        <SideBar/>
      </div>
    </main>
  )
}

export default About;