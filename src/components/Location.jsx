import { useState } from 'react';
import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

export default function Location() {
  const { venue, parking } = weddingData;
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 접근이 불가한 환경일 경우 조용히 무시합니다.
    }
  };

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">오시는 길</h2>

        <p className="location__venue">{venue.name}</p>
        <p className="location__building">{venue.building}</p>
        <p className="location__address">{venue.address}</p>

        <div className="location__actions">
          <button type="button" className="btn btn--outline" onClick={handleCopyAddress}>
            {copied ? '주소 복사됨' : '주소 복사'}
          </button>
          <a
            className="btn btn--outline"
            href={venue.kakaoMapUrl}
            target="_blank"
            rel="noreferrer"
          >
            카카오맵
          </a>
          <a
            className="btn btn--outline"
            href={venue.naverMapUrl}
            target="_blank"
            rel="noreferrer"
          >
            네이버지도
          </a>
        </div>

        <div className="parking">
          <p className="parking__title">주차 안내</p>
          <ul className="parking__list">
            {parking.map((p) => (
              <li key={p.label} className="parking__item">
                <span className="parking__label">{p.label}</span>
                <span className="parking__desc">
                  {p.description} ({p.address})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
