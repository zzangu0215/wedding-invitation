import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

export default function Closing() {
  const { closing, footer, groom, bride } = weddingData;

  return (
    <section className="section section--closing">
      <FadeIn>
        <Divider />
        <div className="closing__body">
          {closing.lines.map((line, i) => (
            <p key={i} className="closing__line">
              {line}
            </p>
          ))}
        </div>
        <p className="closing__signature">
          {groom.name} &amp; {bride.name}
        </p>
      </FadeIn>

      <footer className="footer">
        <p className="footer__copyright">{footer.copyright}</p>
        <p className="footer__contact">{footer.contact}</p>
      </footer>
    </section>
  );
}
