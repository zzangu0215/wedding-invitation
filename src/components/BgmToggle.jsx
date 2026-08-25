import { useEffect, useRef, useState } from 'react';
import weddingData from '../data/weddingData.js';

/**
 * 우측 상단에 떠 있는 배경음악 켜기/끄기 버튼.
 *
 * 브라우저는 사용자가 화면을 건드리기 전의 자동 재생을 막습니다.
 * 그래서 먼저 재생을 시도해 보고, 막히면 첫 탭·스크롤 때 한 번만 다시 시도합니다.
 * (한 번이라도 직접 껐다면 그 뜻을 존중해 다시 켜지 않습니다)
 */
export default function BgmToggle() {
  const audioRef = useRef(null);
  const mutedByUserRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(weddingData.audio.bgm);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.38;
    audioRef.current = audio;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    const events = ['pointerdown', 'touchstart', 'keydown', 'scroll'];
    const startOnGesture = () => {
      if (mutedByUserRef.current) return;
      audio.play().catch(() => {});
    };
    const armGesture = () => {
      events.forEach((type) =>
        window.addEventListener(type, startOnGesture, { once: true, passive: true })
      );
    };
    const disarmGesture = () => {
      events.forEach((type) => window.removeEventListener(type, startOnGesture));
    };

    // 자동 재생이 허용되는 환경이면 바로, 막히면 첫 상호작용 때 시작합니다.
    audio.play().catch(armGesture);

    return () => {
      disarmGesture();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      mutedByUserRef.current = false;
      audio.play().catch(() => {});
    } else {
      mutedByUserRef.current = true;
      audio.pause();
    }
  };

  return (
    <button
      type="button"
      className={`bgm-toggle${playing ? ' bgm-toggle--on' : ''}`}
      onClick={toggle}
      aria-label={playing ? '배경음악 끄기' : '배경음악 켜기'}
      aria-pressed={playing}
    >
      <span className="bgm-toggle__icon" aria-hidden="true">
        ♪
      </span>
    </button>
  );
}
