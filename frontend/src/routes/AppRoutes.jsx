import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../features/dashboard/DashboardPage";
import ProductPage from "../features/products/ProductPage";
import CustomerPage from "../features/customers/CustomerPage";
import OrderPage from "../features/orders/OrderPage";
import LoginPage from "../features/auth/pages/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import RegisterPage from "../features/auth/pages/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/products"
          element={<ProductPage />}
        />

        <Route
          path="/customers"
          element={<CustomerPage />}
        />

        <Route
          path="/orders"
          element={<OrderPage />}
        />
      </Route>
    </Routes>
  );
}