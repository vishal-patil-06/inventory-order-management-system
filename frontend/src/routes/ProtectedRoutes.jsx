import {
  Navigate,
  Outlet,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function ProtectedRoute() {
  const owner =
    localStorage.getItem(
      "owner"
    );

  return owner ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}