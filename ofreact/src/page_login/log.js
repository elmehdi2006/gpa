import { useState, useEffect } from "react"; // استيراد React باش نخدمو JSX
import "./log.css"; // استيراد ملف CSS ديال التصميم
import img from "../assets/13.jpg"; // صورة الخلفية
import bg from "../assets/bg.jpg"; // صورة الفوق (header)
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, isLoading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (user?.role === "admin") {
      navigate("/om", { replace: true });
    } else if (user?.role === "employee") {
      navigate("/cempl", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const handleLogin = async (role) => {
    setError("");
    setIsSubmitting(true);

    const result = await login({
      email: form.email,
      password: form.password,
      role,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user.role === "admin") {
      navigate("/om");
    } else {
      navigate("/cempl");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    // الكونتينر الرئيسي + خلفية بالصورة
    <div
      className="login-container"
      style={{ backgroundImage: `url(${img})` }} // كنستعمل الصورة كـ background
    >
      {/* Overlay: طبقة شفافة فوق الخلفية باش توضح المحتوى */}
      <div className="overlay"></div>

      {/* Card: الصندوق اللي فيه الفورم */}
      <div className="login-card">
        {/* صورة فوق الفورم (ديكور) */}
        <div className="header-image">
          <img src={bg} alt="header" /> {/* عرض الصورة */}
        </div>

        {/* محتوى الكارت */}
        <div className="card-content">
          {/* العنوان */}
          <h2>Ministère des habous et des affaires islamiques</h2>

          {/* subtitle */}
          <p className="subtitle">Bienvenue, veuillez vous connecter</p>

          {/* الفورم */}
          <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            {/* input ديال username */}
            <div className="input-group">
              <label>Email</label> {/* label */}
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Entrez votre email d'utilisateur" // placeholder
              />
            </div>

            {/* input ديال password */}
            <div className="input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* زر تسجيل الدخول */}
            <button
              type="submit"
              className="btn-primary"
              onClick={() => handleLogin("employe")}
            >
              Se connecter
            </button>

            {/* فاصل */}
            <div className="divider">ou</div>

            {/* زر ثاني */}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleLogin("admin")}
            >
              Contacter l'administrateur
            </button>
          </form>
        </div>
      </div>

      {/* Footer ديال الصفحة */}
      <footer className="footer">© 2026 ELMEHDI MAZOUZ</footer>
    </div>
  );
}
