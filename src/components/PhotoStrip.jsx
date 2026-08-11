import { useEffect, useRef, useState } from 'react';

/**
 * 옆으로 넘겨 보는 사진 띠.
 * 세로 스크롤을 늘리지 않으려고 갤러리 대신 가로 스와이프로 보여줍니다.
 * CSS scroll-snap을 쓰기 때문에 별도 라이브러리 없이 손가락 스와이프가 그대로 동작합니다.
 */
export default function PhotoStrip({ photos, alt }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // 스크롤 위치로 현재 몇 번째 사진인지 계산해 인디케이터에 반영합니다.
    const handleScroll = () => {
      const slide = track.scrollWidth / photos.length;
      setIndex(Math.round(track.scrollLeft / slide));
    };

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, [photos.length]);

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: (track.scrollWidth / photos.length) * i, behavior: 'smooth' });
  };

  return (
    <div className="photo-strip">
      <div className="photo-strip__track" ref={trackRef}>
        {photos.map((src, i) => (
          <img
            key={src}
            className="photo-strip__photo"
            src={src}
            alt={`${alt} ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable="false"
          />
        ))}
      </div>

      <div className="photo-strip__dots">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            className={i === index ? 'photo-strip__dot photo-strip__dot--on' : 'photo-strip__dot'}
            aria-label={`${i + 1}번째 사진 보기`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
