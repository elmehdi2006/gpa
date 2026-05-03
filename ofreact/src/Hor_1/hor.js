import React, { useEffect, useState } from "react";
import "./hor.css";
import logo from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
// القيم الافتراضية ديال schedule
const defaultSchedule = {
  morningStart: "08:00",
  morningEnd: "12:00",
  afternoonStart: "14:00",
  afternoonEnd: "18:00",
};

export default function Hor() {
  const navigate = useNavigate();// التنقل بين الصفحات
   // states
  const [schedule, setSchedule] = useState(defaultSchedule);// الأوقات
  const [message, setMessage] = useState("");// رسالة النجاح
  // تحميل البيانات من localStorage أول مرة
  useEffect(() => {
    const savedSchedule = localStorage.getItem("adminWorkSchedule");

    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule)); // تحويل JSON ل object
    }
  }, []);
  // تحديث القيم ديال inputs
  const handleChange = (event) => {
    setSchedule({
      ...schedule,// كنحتافظو بالباقي
      [event.target.name]: event.target.value,// كنبدلو غير القيمة لي تبدلات
    });
  };
  // submit ديال الفورم
  const handleSubmit = (event) => {
    event.preventDefault();// منع reload
      // تخزين فـ localStorage
      localStorage.setItem("adminWorkSchedule", JSON.stringify(schedule));
      // message نجاح
      setMessage("Les horaires ont ete enregistres avec succes.");
// نحيد message من بعد 3 ثواني
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="hor-page">
       {/* Sidebar */}
      <aside className="hor-sidebar">
        <div className="hor-logo">
          <img src={logo} alt="logo" /> {/* اللوغو */}
        </div>
{/* navigation */}
        <button className="hor-menu" onClick={() => navigate("/om")}>
          Vue d'ensemble
        </button>
        <button className="hor-menu" onClick={() => navigate("/emp")}>
          Employes
        </button>
        <button className="hor-menu active" onClick={() => navigate("/hor")}>
          Horaires
        </button>
        <button className="hor-menu" onClick={() => navigate("/ge")}>
          Gestion
        </button>
        <button className="hor-menu" onClick={() => navigate("/des")}>
          Archive
        </button>
      </aside>
 {/* Main */}
      <main className="hor-main">
        {/* Header */}
        <div className="hor-header">
          <div className="hor-title">
            <h1>Horaires de travail</h1>
            <p>
              Cette page permet a l'admin de definir les horaires de la periode
              du matin et de l'apres-midi.
            </p>
          </div>
        </div>
{/* Form */}
        <form className="hor-form-card" onSubmit={handleSubmit}>
          <div className="hor-card-head">
            <h2>Definir les periodes</h2>
            <p>Entrez les heures de debut et de fin pour chaque periode.</p>
          </div>

          <div className="hor-sections">
            <div className="hor-section">
               {/* Matin */}
              <h3>Periode du matin</h3>

              <div className="hor-grid">
                <div className="hor-field">
                  <label htmlFor="morningStart">Heure d'entree</label>
                  <input
                    id="morningStart"
                    name="morningStart"
                    type="time"
                    value={schedule.morningStart}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hor-field">
                  <label htmlFor="morningEnd">Heure de sortie</label>
                  <input
                    id="morningEnd"
                    name="morningEnd"
                    type="time"
                    value={schedule.morningEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="hor-section">
               {/* Apres-midi */}
              <h3>Periode de l'apres-midi</h3>

              <div className="hor-grid">
                <div className="hor-field">
                  <label htmlFor="afternoonStart">Heure d'entree</label>
                  <input
                    id="afternoonStart"
                    name="afternoonStart"
                    type="time"
                    value={schedule.afternoonStart}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="hor-field">
                  <label htmlFor="afternoonEnd">Heure de sortie</label>
                  <input
                    id="afternoonEnd"
                    name="afternoonEnd"
                    type="time"
                    value={schedule.afternoonEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
{/* button */}
          <button type="submit" className="hor-submit">
            Enregistrer les horaires
          </button>
        </form>
{/* Preview */}
        <section className="hor-preview">
          <div className="hor-preview-card">
            <span>Matin</span>
            <strong>
              {schedule.morningStart} - {schedule.morningEnd}
            </strong>
          </div>

          <div className="hor-preview-card">
            <span>Apres-midi</span>
            <strong>
              {schedule.afternoonStart} - {schedule.afternoonEnd}
            </strong>
          </div>
        </section>
 {/* Message */}
        {message ? <div className="hor-message">{message}</div> : null}
      </main>
    </div>
  );
}