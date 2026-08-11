import { useState } from 'react';
import PhotoStrip from './components/PhotoStrip.jsx';
import MapActions from './components/MapActions.jsx';
import ParkingList from './components/ParkingList.jsx';
import weddingData from './data/weddingData.js';
import './App.css';
import './Business.css';

/**
 * 거래처 송부용 간략 버전.
 * 세로 스크롤을 줄이려고 달력·카운트다운·세로 갤러리·맺음말을 빼고,
 * 사진은 옆으로 넘겨 보도록 했습니다. 계좌는 혼주(박종철) 한 건만 노출합니다.
 */
function BusinessAccount() {
  const { accounts, business } = weddingData;
  const [copied, setCopied] = useState(false);

  // 계좌번호를 중복해서 적어두지 않도록, 기본 청첩장 데이터에서 혼주 계좌를 찾아 씁니다.
  const account = accounts.groomSide.list.find((a) => a.holder === business.accountHolder);
  if (!account) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // 클립보드 접근 불가 시 조용히 무시합니다.
    }
  };

  return (
    <div className="biz-account">
      <p className="biz-block__title">마음 전하실 곳</p>
      <p className="biz-account__notice">{business.accountNotice}</p>
      <p className="biz-account__line">
        {account.bank} {account.number}
      </p>
      <p className="biz-account__holder">예금주 {account.holder}</p>
      <button type="button" className="btn btn--small" onClick={handleCopy}>
        {copied ? '복사됨' : '계좌번호 복사'}
      </button>
    </div>
  );
}

export default function BusinessApp() {
  const { groom, bride, wedding, venue, business } = weddingData;

  return (
    <div className="invitation invitation--compact">
      <PhotoStrip photos={business.photos} alt={`${groom.name}, ${bride.name} 커플 사진`} />

      <header className="biz-head">
        <p className="biz-head__host">{business.hostLine}</p>
        <h1 className="biz-head__names">
          {groom.name} <span className="biz-head__amp">&amp;</span> {bride.name}
        </h1>
        <p className="biz-head__date">{wedding.dateDisplay}</p>
        <p className="biz-head__venue">
          {venue.name} · {venue.building}
        </p>
      </header>

      <div className="biz-body">
        <div className="biz-greeting">
          {business.greeting.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="biz-block">
          <p className="biz-block__title">오시는 길</p>
          <p className="biz-block__address">{venue.address}</p>
          <MapActions />
          <ParkingList />
        </div>

        <BusinessAccount />
      </div>

      <footer className="biz-foot">
        <p>{groom.name} · {bride.name}</p>
      </footer>
    </div>
  );
}
