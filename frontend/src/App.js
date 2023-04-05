import './App.css';
import Footer from './components/Footer/Footer';
import TopNavBar from './components/TopNavBar/TopNavBar';
import Router from './router/Router';

function App() {
  
  return (
    <div className = 'container'>
      <TopNavBar/>
      <Router/>
      <Footer/>
    </div>
  );
}

export default App;
