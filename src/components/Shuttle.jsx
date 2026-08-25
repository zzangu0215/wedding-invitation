import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

/**
 * 군산·익산에서 출발하는 대절 버스 안내.
 * 노선 내용은 weddingData.shuttle 에서만 고치면 됩니다.
 */
export default function Shuttle() {
  const { shuttle, features } = weddingData;

  if (!features.showShuttle) return null;

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">버스 시간 안내</h2>

        <p className="shuttle__notice">{shuttle.notice}</p>

        <ul className="shuttle__list">
          {shuttle.routes.map((route) => (
            <li key={route.label} className="shuttle__item">
              <p className="shuttle__label">{route.label}</p>
              <p className="shuttle__place">{route.place}</p>
              <p className="shuttle__time">{route.time}</p>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
