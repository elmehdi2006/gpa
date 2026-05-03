import React, { useEffect, useState } from "react";
import "./des.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { getEmployees } from "../api/getEmployees";
// الموظفين المؤرشفين

export default function Archive() {
  const navigate = useNavigate(); // navigation
  // states
  const [search, setSearch] = useState(""); // البحث
  const [employees, setEmployees] = useState([]); // archive list
  const [isLoading, setIsLoading] = useState(true);

  // تنظيف search
  const query = search.trim().toLowerCase();

  useEffect(() => {
    const loadAchivedEmployee = async () => {
      const result = await getEmployees("1");
      if (result.success) {
        setEmployees(result.data);
      }
      setIsLoading(false);
    };
    loadAchivedEmployee();
  }, []);

  return (
    <div className="des-page">
      <aside className="des-sidebar">
        <div className="des-logo">
          <img src={bg} alt="logo" />
          {/* navigation */}
        </div>

        <button className="des-menu" onClick={() => navigate("/om")}>
          Vue d'ensemble
        </button>
        <button className="des-menu" onClick={() => navigate("/emp")}>
          Employes
        </button>
        <button className="des-menu" onClick={() => navigate("/hor")}>
          Horaires
        </button>
        <button className="des-menu" onClick={() => navigate("/ge")}>
          Gestion
        </button>
        <button className="des-menu active" onClick={() => navigate("/des")}>
          Archive
        </button>
      </aside>
      {/* Main */}
      <main className="des-main">
        {/* Header */}
        <div className="des-header">
          <div className="des-title">
            <h1>Archive des employes</h1>
            <p>Page simple pour consulter et desarchiver rapidement.</p>
          </div>
          {/* counters */}
          <div className="des-summary">
            <div className="des-badge">{employees.length} archives</div>
          </div>
        </div>
        {/* Search */}
        <div className="des-toolbar">
          <input
            className="des-search"
            type="text"
            placeholder="Rechercher par nom, role ou email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <section className="des-table-card">
          <div className="des-table-head">
            <h2>Liste des employes archives</h2>
            <p>{employees.length} resultat(s)</p>
          </div>

          <div className="des-table-wrap">
            <table className="des-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="des-name">{employee.name}</td>
                      <td className="des-role">{employee.role}</td>
                      <td className="des-email">{employee.email}</td>
                      <td>
                        <button
                          type="button"
                          className="des-restore-btn"
                          onClick={() =>
                            setEmployees((currentEmployees) =>
                              currentEmployees.filter(
                                (item) => item.id !== employee.id, // حذف من archive
                              ),
                            )
                          }
                        >
                          Desarchiver
                        </button>
                      </td>
                    </tr>
                  ))
                ) : isLoading ? (
                  <tr>
                    <td className="des-empty" colSpan="4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td className="des-empty" colSpan="4">
                      Aucun employe archive trouve.
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
