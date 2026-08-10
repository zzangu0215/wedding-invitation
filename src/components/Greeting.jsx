import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

export default function Greeting() {
  const { greeting } = weddingData;

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">{greeting.title}</h2>
        <div className="greeting__body">
          {greeting.lines.map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : (
              <p key={i} className="greeting__line">
                {line}
              </p>
            )
          )}
        </div>
      </FadeIn>
    </section>
  );
}
