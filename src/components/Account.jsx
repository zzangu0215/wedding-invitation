import { useState } from 'react';
import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

function AccountGroup({ group }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const handleCopy = async (e, i, number) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(number);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // 클립보드 접근 불가 시 조용히 무시합니다.
    }
  };

  return (
    <div className="account-group">
      <p className="account-group__label">{group.label}</p>
      <ul className="account-group__list">
        {group.list.map((acc, i) => {
          const isOpen = openIndex === i;
          return (
            <li key={i} className="account-item">
              <button
                type="button"
                className="account-item__summary"
                aria-expanded={isOpen}
                onClick={() => toggle(i)}
              >
                <span>
                  {acc.holder} <span className="account-item__bank">{acc.bank}</span>
                </span>
                <span className="account-item__chevron">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="account-item__detail">
                  <span className="account-item__number">{acc.number}</span>
                  <button
                    type="button"
                    className="btn btn--small"
                    onClick={(e) => handleCopy(e, i, acc.number)}
                  >
                    {copiedIndex === i ? '복사됨' : '복사'}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Account() {
  const { accounts } = weddingData;

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">마음 전하실 곳</h2>
        <p className="account__notice">{accounts.notice}</p>

        <div className="account__groups">
          <AccountGroup group={accounts.groomSide} />
          <AccountGroup group={accounts.brideSide} />
        </div>
      </FadeIn>
    </section>
  );
}
