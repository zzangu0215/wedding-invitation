import { useCallback, useEffect, useRef } from 'react';

const SWIPE_THRESHOLD = 50; // 이보다 많이 밀어야 사진이 넘어갑니다.

/**
 * 갤러리 사진을 전체 화면으로 한 장씩 보여줍니다.
 * 좌우 스와이프 / 화살표 버튼 / 키보드 방향키로 이동합니다.
 *
 * @param {string[]} photos  사진 경로 목록
 * @param {number}   index   지금 보고 있는 사진 번호 (0부터)
 * @param {Function} onClose 닫기
 * @param {Function} onIndexChange 사진 이동
 */
export default function Lightbox({ photos, index, onClose, onIndexChange }) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const closeButtonRef = useRef(null);

  const total = photos.length;

  const goPrev = useCallback(() => {
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  // 열려 있는 동안 뒤쪽 청첩장이 같이 스크롤되지 않게 막습니다.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, goPrev, goNext]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    // 세로로 더 많이 움직였다면 스와이프가 아니라 그냥 손이 미끄러진 경우로 봅니다.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) goPrev();
    else goNext();
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="갤러리 사진 크게 보기"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        type="button"
        ref={closeButtonRef}
        className="lightbox__close"
        onClick={onClose}
        aria-label="닫기"
      >
        ×
      </button>

      <img
        className="lightbox__photo"
        src={photos[index]}
        alt={`갤러리 사진 ${index + 1}`}
        // 오버레이 클릭은 닫기이므로 사진 자체를 누른 건 통과시키지 않습니다.
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={(e) => {
          e.stopPropagation();
          goPrev();
        }}
        aria-label="이전 사진"
      >
        ‹
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={(e) => {
          e.stopPropagation();
          goNext();
        }}
        aria-label="다음 사진"
      >
        ›
      </button>

      <p className="lightbox__counter">
        {index + 1} / {total}
      </p>
    </div>
  );
}
