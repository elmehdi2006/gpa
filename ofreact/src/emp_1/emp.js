import React, { useState } from "react";
import "./emp.css";
import logo from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";

export default function Emp() {
  const navigate = useNavigate(); // التنقل
  const [showModal, setShowModal] = useState(false); // modal
  const [employeeName, setEmployeeName] = useState(""); // الاسم
  const [form, setForm] = useState({
    nom: "",
    email: "",
    role: "",
    password: "",
  });
  // submit
  const handleSubmit = (event) => {
    event.preventDefault(); // منع reload
    setEmployeeName(form.nom); // تخزين الاسم
    setShowModal(true); // اظهار modal
    // reset الفورم
    setForm({
      nom: "",
      email: "",
      role: "",
      password: "",
    });
  };

  return (
    <div className="emp-page">
      {/* Sidebar */}
      <aside className="emp-sidebar">
        <div className="emp-logo">
          <img src={logo} alt="logo" />
        </div>
        {/* navigation */}
        <button className="emp-menu" onClick={() => navigate("/om")}>
          Vue d'ensemble
        </button>
        <button className="emp-menu active" onClick={() => navigate("/emp")}>
          Employes
        </button>
        <button className="emp-menu" onClick={() => navigate("/hor")}>
          Horaires
        </button>
        <button className="emp-menu" onClick={() => navigate("/ge")}>
          Gestion
        </button>
        <button className="emp-menu" onClick={() => navigate("/des")}>
          Archive
        </button>
      </aside>
      {/* Main */}
      <main className="emp-main">
        {/* Header */}
        <div className="emp-header">
          <div className="emp-title">
            <h1>Ajouter un employe</h1>
            <p>Formulaire simple pour preparer l'ajout d'un employe.</p>
          </div>
        </div>

        <section className="emp-form-card">
          <div className="emp-card-head">
            <h2>Informations de l'employe</h2>
          </div>
          {/* Form */}
          <form className="emp-form" onSubmit={handleSubmit}>
            <div className="emp-field">
              {/* Nom */}
              <label htmlFor="nom">Nom complet</label>
              <input
                id="nom"
                type="text"
                placeholder="Ex: Ahmed Benali"
                value={form.nom}
                onChange={
                  (event) => setForm({ ...form, nom: event.target.value }) // update nom
                }
                required
              />
            </div>

            <div className="emp-field">
              {/* Email */}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Ex: ahmed@mail.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
            </div>

            <div className="emp-field">
              {/* Role */}
              <label htmlFor="role">Role</label>
              <input
                id="role"
                type="text"
                placeholder="Ex: Developpeur"
                value={form.role}
                onChange={(event) =>
                  setForm({ ...form, role: event.target.value })
                }
                required
              />
            </div>

            <div className="emp-field">
              {/* Password */}
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={
                  (event) => setForm({ ...form, password: event.target.value }) // update password
                }
                required
              />
            </div>

            <button type="submit" className="emp-submit">
              Enregistrer
            </button>
          </form>
        </section>
      </main>
      {/* Modal */}
      {showModal ? (
        <div className="emp-modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="emp-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <h3>Inscription reussie</h3>
            {/* message */}
            <p>
              L'employe {employeeName ? `"${employeeName}"` : ""} a ete ajoute
              avec succes.
            </p>
            {/* close */}
            <button
              type="button"
              className="emp-modal-btn"
              onClick={() => setShowModal(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
