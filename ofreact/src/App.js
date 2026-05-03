import { BrowserRouter, Routes, Route } from "react-router-dom";

import Om from "./page_om/om";
import Emp from "./emp_1/emp";
import Hor from "./Hor_1/hor";
import Login from "./page_login/log";
import Mpp from "./gestion/ge";
import Mpi from "./Des/des";
import Cep from "./Cempl/cempl";
import Mff from "./Mfa/mfa";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/om"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Om />
            </ProtectedRoute>
          }
        />

        <Route
          path="/emp"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Emp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Hor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ge"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Mpp />
            </ProtectedRoute>
          }
        />

        <Route
          path="/des"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Mpi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mfa"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Mff />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cempl"
          element={
            <ProtectedRoute allowedRoles={["employe"]}>
              <Cep />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App