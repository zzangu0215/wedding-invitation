import weddingData from '../data/weddingData.js';

/**
 * 주차장 안내 목록. 기본 청첩장과 거래처용 간략 버전이 함께 씁니다.
 */
export default function ParkingList() {
  const { parking } = weddingData;

  return (
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
  );
}
