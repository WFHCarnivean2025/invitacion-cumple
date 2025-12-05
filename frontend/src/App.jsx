import { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  const targetDate = new Date("December 7, 2025 15:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({});
  const [musicEnabled, setMusicEnabled] = useState(false);

  const audioRef = useRef(null);

  const enableMusic = () => {
    setMusicEnabled(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(null);
        clearInterval(timer);
        return;
      }

      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container vibrate-bg">
      <div className="card">
        <h1>🎉 ¡Invitación de Cumpleaños! 🎉</h1>

        <p>
          Te invito este <strong>domingo 7 de diciembre</strong> a las{" "}
          <strong>3:00 PM</strong>.
        </p>

        {timeLeft ? (
          <div className="countdown">
            <div><strong>{timeLeft.days}</strong> días</div>
            <div><strong>{timeLeft.hours}</strong> horas</div>
            <div><strong>{timeLeft.minutes}</strong> minutos</div>
            <div><strong>{timeLeft.seconds}</strong> segundos</div>
          </div>
        ) : (
          <h2>¡Es hoy! 🎂🥳</h2>
        )}

        {/* BOTÓN PARA ACTIVAR MÚSICA */}
        {!musicEnabled && (
          <button onClick={enableMusic} className="enable-music-btn">
            ¡SI! 🔊
          </button>
        )}
      </div>

      <div className="effects-area">
        <div className="balloon balloon1"></div>
        <div className="balloon balloon2"></div>
        <div className="balloon balloon3"></div>
        <div className="confetti"></div>
        <div className="fireworks"></div>
      </div>

      <audio ref={audioRef} src="/serpiente.mp3" />
    </div>
  );
}