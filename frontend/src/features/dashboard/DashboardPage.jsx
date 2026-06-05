import { useEffect, useState } from "react";

import DashboardCard from "./DashboardCard";
import LowStockTable from "./LowStockTable";
import RecentOrdersTable from "./RecentOrdersTable";

import { getDashboardSummary } from "../../api/dashboardApi";

export default function DashboardPage() {
  const [dashboardStats, setDashboardStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response =
        await getDashboardSummary();

      const data =
        response.data;

      setDashboardStats({
        totalProducts:
          data.total_products,

        totalCustomers:
          data.total_customers,

        totalOrders:
          data.total_orders,

        lowStockProducts:
          data.low_stock_products,

        inventoryValue:
          data.total_inventory_value,
      });
    } catch (error) {
      console.error(
        "Dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Overview of products,
          customers, orders and
          inventory status.
        </p>
      </div>

      {/* Hero Banner */}

      <div
        className="
          mb-8
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-600
          p-8
        "
      >
        <h2 className="text-3xl font-bold">
          Inventory Overview
        </h2>

        <p className="mt-3 text-violet-100">
          Monitor inventory levels,
          customer growth and order
          activity from one place.
        </p>
      </div>

      {/* KPI Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
          gap-5
          mb-8
        "
      >
        <DashboardCard
          title="Products"
          value={
            dashboardStats.totalProducts
          }
          description="Products available"
        />

        <DashboardCard
          title="Customers"
          value={
            dashboardStats.totalCustomers
          }
          description="Registered customers"
        />

        <DashboardCard
          title="Orders"
          value={
            dashboardStats.totalOrders
          }
          description="Total orders"
        />

        <DashboardCard
          title="Low Stock"
          value={
            dashboardStats.lowStockProducts
          }
          description="Require attention"
        />

        <DashboardCard
          title="Inventory Value"
          value={`₹${Number(
            dashboardStats.inventoryValue
          ).toLocaleString()}`}
          description="Current stock value"
        />
      </div>

      {/* Tables */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        <LowStockTable
          products={[]}
        />

        <RecentOrdersTable
          orders={[]}
        />
      </div>
    </div>
  );
}