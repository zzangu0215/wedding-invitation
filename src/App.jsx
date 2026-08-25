import Hero from './components/Hero.jsx';
import Greeting from './components/Greeting.jsx';
import DateInfo from './components/DateInfo.jsx';
import Couple from './components/Couple.jsx';
import Location from './components/Location.jsx';
import Shuttle from './components/Shuttle.jsx';
import Gallery from './components/Gallery.jsx';
import Account from './components/Account.jsx';
import Closing from './components/Closing.jsx';
import BgmToggle from './components/BgmToggle.jsx';
import weddingData from './data/weddingData.js';
import './App.css';

function App() {
  return (
    <div className="invitation">
      {weddingData.features.showBgm && <BgmToggle />}
      <Hero />
      <Greeting />
      <DateInfo />
      <Couple />
      <Location />
      <Shuttle />
      <Gallery />
      <Account />
      <Closing />
    </div>
  );
}

export default App;
