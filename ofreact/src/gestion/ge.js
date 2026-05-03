import React, { useEffect, useState } from "react";
import "./ge.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";

import { getEmployees } from "../api/getEmployees";

export default function Gestion() {
  const navigate = useNavigate(); // navigation
  // states
  const [search, setSearch] = useState(""); // البحث
  const [employees, setEmployees] = useState([]); // اللائحة

  const [isLoading, setIsLoading] = useState(true);
  // تنظيف search
  const query = search.trim().toLowerCase();

  useEffect(() => {
    const loadActiveEmployee = async () => {
      const result = await getEmployees("0");
      if (result.success) {
        setEmployees(result.data);
      }
      setIsLoading(false);
    };
    loadActiveEmployee();
  }, []);

  // حساب عدد المؤرشفين
  // const archivedCount = initialEmployees.length - employees.length;

  return (
    <div className="ge-page">
      {/* Sidebar */}
      <aside className="ge-sidebar">
        <div className="ge-logo">
          <img src={bg} alt="logo" />
          {/* اللوغو */}
        </div>
        {/* navigation */}
        <button className="ge-menu" onClick={() => navigate("/om")}>
          Vue d'ensemble
        </button>
        <button className="ge-menu" onClick={() => navigate("/emp")}>
          Employes
        </button>
        <button className="ge-menu" onClick={() => navigate("/hor")}>
          Horaires
        </button>
        <button className="ge-menu active" onClick={() => navigate("/ge")}>
          Gestion
        </button>
        <button className="ge-menu" onClick={() => navigate("/des")}>
          Archive
        </button>
      </aside>
      {/* Main */}
      <main className="ge-main">
        {/* Header */}
        <div className="ge-header">
          <div className="ge-title">
            <h1>Gestion des employes</h1>
            <p>Page simple pour rechercher et archiver rapidement.</p>
          </div>
          {/* counters */}
          <div className="ge-summary">
            <div className="ge-badge">{employees?.length} actifs</div>
          </div>
        </div>
        {/* Search */}
        <div className="ge-toolbar">
          <input
            className="ge-search"
            type="text"
            placeholder="Rechercher par nom, role ou email"
            value={search}
            onChange={(event) => setSearch(event.target.value)} // تحديث search
          />
        </div>

        <section className="ge-table-card">
          <div className="ge-table-head">
            <h2>Liste des employes</h2>
            <p>{employees?.length} resultat(s)</p>
          </div>

          <div className="ge-table-wrap">
            <table className="ge-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="ge-name">{employee.name}</td>
                      <td className="ge-role">{employee.role}</td>
                      <td className="ge-email">{employee.email}</td>
                      <td>
                        <button
                          type="button"
                          className="ge-archive-btn"
                          onClick={() =>
                            setEmployees((currentEmployees) =>
                              currentEmployees.filter(
                                (item) => item.id !== employee.id, // حذف الموظف
                              ),
                            )
                          }
                        >
                          Archiver
                        </button>
                      </td>
                    </tr>
                  ))
                ) : isLoading ? (
                  <tr>
                    <td className="ge-empty" colSpan="4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="ge-empty" colSpan="4">
                      Aucun employe trouve.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
