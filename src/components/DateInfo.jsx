import { useEffect, useState } from 'react';
import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

// 예식일은 항상 한국 시간 기준으로 읽습니다.
// 그냥 date.getDate()를 쓰면 해외에서 열었을 때 하루 밀려 보입니다.
function getSeoulYmd(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return { year: get('year'), month: get('month') - 1, day: get('day') };
}

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  return cells;
}

function getCountdownParts(targetDate) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function DateInfo() {
  const { wedding, features } = weddingData;
  const targetDate = new Date(wedding.dateISO);
  const { year, month, day: targetDay } = getSeoulYmd(targetDate);
  const cells = buildCalendarGrid(year, month);

  const [countdown, setCountdown] = useState(() => getCountdownParts(targetDate));

  useEffect(() => {
    if (!features.showCountdown) return;
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(targetDate));
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section">
      <FadeIn>
        <Divider />
        <h2 className="section__title">예식 일시</h2>
        <p className="date-info__display">{wedding.dateDisplay}</p>
        <p className="date-info__lunar">{wedding.lunarDisplay}</p>

        <div className="calendar">
          <p className="calendar__month">{month + 1}월</p>
          <div className="calendar__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w} className="calendar__weekday">
                {w}
              </span>
            ))}
          </div>
          <div className="calendar__grid">
            {cells.map((day, i) => (
              <span
                key={i}
                className={
                  day === targetDay
                    ? 'calendar__day calendar__day--target'
                    : 'calendar__day'
                }
              >
                {day ?? ''}
              </span>
            ))}
          </div>
        </div>

        {features.showCountdown && countdown && (
          <div className="countdown">
            <div className="countdown__item">
              <span className="countdown__value">{countdown.days}</span>
              <span className="countdown__label">일</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{countdown.hours}</span>
              <span className="countdown__label">시간</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{countdown.minutes}</span>
              <span className="countdown__label">분</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value">{countdown.seconds}</span>
              <span className="countdown__label">초</span>
            </div>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
