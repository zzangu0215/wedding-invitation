import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

export default function Couple() {
  const { groom, bride } = weddingData;

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">신랑 · 신부</h2>

        <div className="couple">
          <div className="couple__person">
            <p className="couple__parents">
              {groom.fatherName} · {groom.motherName}의 아들
            </p>
            <p className="couple__name">{groom.name}</p>
            {groom.intro && <p className="couple__intro">{groom.intro}</p>}
          </div>

          <div className="couple__person">
            <p className="couple__parents">
              {bride.fatherName} · {bride.motherName}의 딸
            </p>
            <p className="couple__name">{bride.name}</p>
            {bride.intro && <p className="couple__intro">{bride.intro}</p>}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
