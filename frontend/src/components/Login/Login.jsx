import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext/UseAuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Login.css';

export const Login = () => {
  const [userForm, setUserForm] = useState({ name: "", password: "" });
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(userForm.name, userForm.password);
    if (result.success) {
      toast.success("Login exitoso");
      navigate("/admin");
    } else {
      toast.error("Credenciales incorrectas");
      setUserForm({ name: "", password: "" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="card-body">
          <h2 className="login-title text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Usuario:</label>
              <input
                id="name"
                type="text"
                name="name"
                className="form-control"
                value={userForm.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                id="password"
                type="password"
                name="password"
                className="form-control"
                value={userForm.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 login-btn">
              Iniciar Sesión
            </button>
          </form>
          <div className="credentials-info mt-3">
            <strong>Credenciales:</strong> <code>admin</code> / <code>1234</code>
          </div>
        </div>
      </div>
    </div>
  );
};
