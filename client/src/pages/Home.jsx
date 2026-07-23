import { useNavigate } from "react-router";
import pinkRing from '../assets/images/pink_ring.jpg';
import tarina from '../assets/images/tarina.jpg';
import purse6 from '../assets/images/purse6.jpeg';
import skullEarrings from '../assets/images/skullEarrings.jpg';
import whiteBangles from '../assets/images/whiteBangles.jpg';
import gN6 from '../assets/images/gN6.jpg';
import purse5 from '../assets/images/purse5.jpeg';
import mensRing from '../assets/images/mensRing.jpg';
import brace14 from '../assets/images/brace14.jpeg';
import gB4 from '../assets/images/gB4.jpg';


const Home = () => {
  const navigate = useNavigate();


  return (<>
 <div className="flex flex-col items-center overflow-hidden bg-base-100" >
      <h1 className="pt-15 fancier text-8xl tracking-normal text-base-content">Frost Yourself</h1>
   
    <div onClick={() => navigate('/products')} className="w-full h-screen relative text-center flex items-center justify-center">
      <div className="inner" style={{ '--quantity': 10 }}>
        <div className="home-card" style={{ '--index': 0, '--color-card': '142, 249, 252' }}>
          <img src={pinkRing} alt="pink ring" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{ '--index': 1, '--color-card': '142, 252, 204' }}>
          <img src={tarina} alt="tarina" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 2, "--color-card": "142, 252, 157" }} >
          <img src={purse6} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 3, "--color-card": "215, 252, 142" }} >
          <img src={skullEarrings} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 4, "--color-card": "252, 252, 142" }} >
          <img src={whiteBangles} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 5, "--color-card": "252, 208, 142" }} >
          <img src={gN6} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 6, "--color-card": "252, 142, 142" }} >
          <img src={purse5} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 7, "--color-card": "252, 142, 239" }} >
          <img src={mensRing} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 8, "--color-card": "204, 142, 252" }} >
          <img src={brace14} alt="" className="img w-65 h-48" />
        </div>
        <div className="home-card" style={{"--index": 9, "--color-card": "142, 202, 252" }} >
          <img src={gB4} alt="" className="img w-65 h-48" />
        </div>
      </div>
    </div>
   
    </div>
    </>
  );
};

export default Home;

