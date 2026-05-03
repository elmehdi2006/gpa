import React, { useState, useEffect, useRef } from "react";
import "./mfa.css";
import img from "../assets/13.jpg";
export default function MFA() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [time, setTime] = useState(180);
  const inputsRef = useRef([]);

  // TIMER
  useEffect(() => {
    if (time <= 0) return;
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // FORMAT TIME
  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // HANDLE INPUT
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // BACKSPACE
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    alert("Code: " + code.join(""));
  };

  return (
    <div className="mfa-container">
      {/* LEFT */}
      <div className="mfa-left">
        <h1> Vérification sécurisée</h1>
        <p>Entrez le code pour continuer</p>

        {/* هنا دير الصورة ديالك */}
       <div className="mfa-left"
             
             style={{ backgroundImage: `url(${img})` }} // كنستعمل الصورة كـ background
           >
        </div>
      </div>

      {/* RIGHT */}
      <div className="mfa-right">
        <h2>Code de vérification</h2>
        <p className="email">
          Code envoyé à <b>a***@example.com</b>
        </p>

        {/* INPUTS */}
        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
            />
          ))}
        </div>

        <p className="timer">
          Expire dans <span>{formatTime()}</span>
        </p>

        <button className="verify-btn" onClick={handleSubmit}>
          Vérifier
        </button>

        <div className="resend">
        </div>
      </div>
    </div>
  );
}