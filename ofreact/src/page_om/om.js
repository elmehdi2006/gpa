import React, { useEffect, useState } from "react";
import "./om.css";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { useAuth } from "../context/AuthContext";
// بيانات الموظفين (static)
const employeesData = [
  {
    id: 1,
    name: "Ahmed Benali",
    role: "Developpeur",
    email: "ahmed@mail.com",
    checkIn: "08:30",
    checkOut: "17:00",
    status: "Present",
  },
  {
    id: 2,
    name: "Sara Khalil",
    role: "RH",
    email: "sara@mail.com",
    checkIn: "09:15",
    checkOut: "17:00",
    status: "Retard",
  },
  {
    id: 3,
    name: "Mahdi Mazouz",
    role: "Manager",
    email: "mahdi@mail.com",
    checkIn: "--",
    checkOut: "--",
    status: "Absent",
  },
  {
    id: 4,
    name: "Lina Amrani",
    role: "Assistante",
    email: "lina@mail.com",
    checkIn: "08:45",
    checkOut: "17:10",
    status: "Present",
  },
  {
    id: 5,
    name: "Youssef Alaoui",
    role: "Comptable",
    email: "youssef@mail.com",
    checkIn: "09:05",
    checkOut: "17:00",
    status: "Retard",
  },
  {
    id: 6,
    name: "Nadia Idrissi",
    role: "Support",
    email: "nadia@mail.com",
    checkIn: "--",
    checkOut: "--",
    status: "Absent",
  },
];

export default function Om() {
  const { logout } = useAuth();

  const navigate = useNavigate(); // function ديال التنقل
  const [time, setTime] = useState(""); // الوقت
  const [search, setSearch] = useState(""); // البحث
  const [filter, setFilter] = useState("Tous"); // الفلتر
  // تحديث الوقت كل ثانية
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleString()); // كنجيب الوقت الحالي
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // كل 1 ثانية

    return () => clearInterval(interval); // تنظيف
  }, []);
  // تحويل search ل lowercase
  const query = search.trim().toLowerCase();
  // فلترة الموظفين
  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(query) || // البحث فالاسم
      employee.email.toLowerCase().includes(query) || // email
      employee.role.toLowerCase().includes(query); // role

    const matchesFilter = filter === "Tous" || employee.status === filter; // الفلتر

    return matchesSearch && matchesFilter;
  });
  // احصائيات
  const stats = {
    total: employeesData.length, // العدد الكلي
    present: employeesData.filter((employee) => employee.status === "Present")
      .length,
    retard: employeesData.filter((employee) => employee.status === "Retard")
      .length,
    absent: employeesData.filter((employee) => employee.status === "Absent")
      .length,
  };
  const handleLogout = async () => {
    await logout();
    navigate("/"); // أو "/login" حسب route ديالك
  };
  return (
    <div className="om-page">
      {/* Sidebar */}
      <aside className="om-sidebar">
        <div className="om-logo">
          <img src={bg} alt="logo" />
        </div>
        {/* أزرار التنقل */}
        <button className="om-menu active" onClick={() => navigate("/om")}>
          Vue d'ensemble
        </button>
        <button className="om-menu" onClick={() => navigate("/emp")}>
          Employes
        </button>
        <button className="om-menu" onClick={() => navigate("/hor")}>
          Horaires
        </button>
        <button className="om-menu" onClick={() => navigate("/ge")}>
          Gestion
        </button>
        <button className="om-menu" onClick={() => navigate("/des")}>
          Archive
        </button>
        <button className="om-menu logout" onClick={handleLogout}>
          Se déconnecter
        </button>
      </aside>
      {/* Main content */}
      <main className="om-main">
        {/* Header */}
        <div className="om-header">
          <div className="om-title">
            <h1>Vue d'ensemble</h1>
            <p>Suivi simple de presence et d'absence des employes.</p>
          </div>
          {/* عرض الوقت */}
          <div className="om-time">{time}</div>
        </div>
        {/* Cards */}
        <div className="om-cards">
          <div className="om-card">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="om-card present">
            <span>Presents</span>
            <strong>{stats.present}</strong>
          </div>
          <div className="om-card retard">
            <span>Retard</span>
            <strong>{stats.retard}</strong>
          </div>
          <div className="om-card absent">
            <span>Absents</span>
            <strong>{stats.absent}</strong>
          </div>
        </div>

        <div className="om-toolbar">
          {/* Search + Filter */}
          <input
            className="om-search"
            type="text"
            placeholder="Rechercher par nom, role ou email"
            value={search}
            onChange={(event) => setSearch(event.target.value)} // تحديث search
          />

          <select
            className="om-select"
            value={filter}
            onChange={(event) => setFilter(event.target.value)} // تحديث filter
          >
            <option value="Tous">Tous</option>
            <option value="Present">Present</option>
            <option value="Retard">Retard</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <section className="om-table-card">
          <div className="om-table-head">
            <h2>Liste des employes</h2>
            <p>{filteredEmployees.length} resultat(s)</p>
          </div>

          <div className="om-table-wrap">
            <table className="om-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Entree</th>
                  <th>Sortie</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="om-name">{employee.name}</td>
                      <td className="om-role">{employee.role}</td>
                      <td className="om-email">{employee.email}</td>
                      <td>{employee.checkIn}</td>
                      <td>{employee.checkOut}</td>
                      <td>
                        <span
                          className={`om-status ${employee.status.toLowerCase()}`}
                        >
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="om-empty" colSpan="6">
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
