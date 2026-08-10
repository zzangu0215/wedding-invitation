import Hero from './components/Hero.jsx';
import Greeting from './components/Greeting.jsx';
import DateInfo from './components/DateInfo.jsx';
import Couple from './components/Couple.jsx';
import Location from './components/Location.jsx';
import Gallery from './components/Gallery.jsx';
import Account from './components/Account.jsx';
import Closing from './components/Closing.jsx';
import './App.css';

function App() {
  return (
    <div className="invitation">
      <Hero />
      <Greeting />
      <DateInfo />
      <Couple />
      <Location />
      <Gallery />
      <Account />
      <Closing />
    </div>
  );
}

export default App;
