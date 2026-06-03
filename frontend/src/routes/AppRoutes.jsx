import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import DashboardPage from "../features/dashboard/DashboardPage";
import ProductPage from "../features/products/ProductPage";
import CustomerPage from "../features/customers/CustomerPage";
import OrderPage from "../features/orders/OrderPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
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