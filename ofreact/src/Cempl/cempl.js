import React, { useEffect, useState } from "react";
import "./cempl.css";
import bg from "../assets/bg.jpg";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EmployeePage() {
  // الوقت الحالي
  const [time, setTime] = useState(new Date());
  // الحالة (واش داخل ولا لا)
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  // وقت الدخول
  const [checkInTime, setCheckInTime] = useState(null);
  // وقت الخروج
  const [checkOutTime, setCheckOutTime] = useState(null);
  // رسالة toast
  const [toast, setToast] = useState("");
  // تحديث الوقت كل ثانية

  const { logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);
  // تحميل البيانات من localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pointage"));

    if (saved) {
      setIsCheckedIn(saved.isCheckedIn);
      setCheckInTime(saved.checkInTime);
      setCheckOutTime(saved.checkOutTime);
    }
  }, []);
  // حفظ البيانات
  const saveData = (data) => {
    localStorage.setItem("pointage", JSON.stringify(data));
  };
  // format الوقت
  const formatTime = (date) => {
    if (!date) return "--:--";

    return new Date(date).toLocaleTimeString("fr-FR");
  };
  // format التاريخ
  const formatDate = (date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  // تسجيل الدخول
  const handleCheckIn = () => {
    if (isCheckedIn) return; // منع double click

    const now = new Date();

    setIsCheckedIn(true);
    setCheckInTime(now);
    setCheckOutTime(null);
    setToast(
      "Connexion reussie, nous vous souhaitons une journee agreable et productive.",
    );

    saveData({
      isCheckedIn: true,
      checkInTime: now,
      checkOutTime: null,
    });

    setTimeout(() => setToast(""), 3000);
  };
  // تسجيل الخروج
  const handleCheckOut = () => {
    if (!isCheckedIn) return;

    const now = new Date();

    setIsCheckedIn(false);
    setCheckOutTime(now);
    setToast("Deconnexion reussie. Merci et a bientot.");

    saveData({
      isCheckedIn: false,
      checkInTime,
      checkOutTime: now,
    });

    setTimeout(() => setToast(""), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="cempl-page">
      {/* Toast */}
      {toast ? <div className="cempl-toast">{toast}</div> : null}

      <main className="cempl-shell">
        {/* Header */}
        <header className="cempl-header">
          <div className="cempl-brand">
            <img src={bg} alt="logo" />
            <div>
              <h1>Espace employe</h1>
              <p>Pointage simple et rapide pour l'entree et la sortie.</p>
            </div>
          </div>
          {/* status */}
          <div className="cempl-header-actions">
            <div className="cempl-badge">
              {isCheckedIn ? "Statut: present" : "Statut: sorti"}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="cempl-logout-btn"
            >
              Se deconnecter
            </button>
          </div>
        </header>
        {/* Clock */}
        <section className="cempl-clock-card">
          <p className="cempl-clock-label">Heure actuelle</p>
          <h2 className="cempl-time">{formatTime(time)}</h2>
          <p className="cempl-date">{formatDate(time)}</p>
        </section>
        {/* Actions */}
        <section className="cempl-actions">
          <button
            type="button"
            className={`cempl-action cempl-checkin ${isCheckedIn ? "disabled" : ""}`}
            onClick={handleCheckIn}
          >
            <span className="cempl-action-label">Check-in</span>
            <strong>Pointer l'entree</strong>
            <p>
              {isCheckedIn
                ? "L'entree a deja ete enregistree."
                : "Cliquez ici pour enregistrer votre arrivee."}
            </p>
          </button>

          <button
            type="button"
            className={`cempl-action cempl-checkout ${!isCheckedIn ? "disabled" : ""}`}
            onClick={handleCheckOut}
          >
            <span className="cempl-action-label">Check-out</span>
            <strong>Pointer la sortie</strong>
            <p>
              {isCheckedIn
                ? "Cliquez ici pour enregistrer votre sortie."
                : "Disponible apres le check-in."}
            </p>
          </button>
        </section>

        <section className="cempl-status-grid">
          {/* Infos */}
          <div className="cempl-info-card">
            <span>Heure d'entree</span>
            <strong className="success">{formatTime(checkInTime)}</strong>
          </div>

          <div className="cempl-info-card">
            <span>Heure de sortie</span>
            <strong className="danger">{formatTime(checkOutTime)}</strong>
          </div>

          <div className="cempl-info-card">
            <span>Etat actuel</span>
            <strong className="primary">
              {isCheckedIn ? "Present" : "Sorti"}
            </strong>
          </div>
        </section>
      </main>
    </div>
  );
}
