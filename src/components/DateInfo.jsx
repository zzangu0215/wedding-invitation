import { useEffect, useState } from 'react';
import FadeIn from './FadeIn.jsx';
import Divider from './Divider.jsx';
import weddingData from '../data/weddingData.js';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function buildCalendarGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  return { cells, year, month };
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
  const { cells, month } = buildCalendarGrid(targetDate);
  const targetDay = targetDate.getDate();

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
