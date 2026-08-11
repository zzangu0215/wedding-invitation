import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import MapActions from './MapActions.jsx';
import ParkingList from './ParkingList.jsx';
import weddingData from '../data/weddingData.js';

export default function Location() {
  const { venue } = weddingData;

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">오시는 길</h2>

        <p className="location__venue">{venue.name}</p>
        <p className="location__building">{venue.building}</p>
        <p className="location__address">{venue.address}</p>

        <MapActions />
        <ParkingList />
      </FadeIn>
    </section>
  );
}
