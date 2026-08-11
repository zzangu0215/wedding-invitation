import { useState } from 'react';
import weddingData from '../data/weddingData.js';

/**
 * 주소 복사 / 카카오맵 / 네이버지도 버튼 묶음.
 * 기본 청첩장과 거래처용 간략 버전이 함께 씁니다.
 */
export default function MapActions() {
  const { venue } = weddingData;
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
    <div className="location__actions">
      <button type="button" className="btn btn--outline" onClick={handleCopyAddress}>
        {copied ? '주소 복사됨' : '주소 복사'}
      </button>
      <a className="btn btn--outline" href={venue.kakaoMapUrl} target="_blank" rel="noreferrer">
        카카오맵
      </a>
      <a className="btn btn--outline" href={venue.naverMapUrl} target="_blank" rel="noreferrer">
        네이버지도
      </a>
    </div>
  );
}
