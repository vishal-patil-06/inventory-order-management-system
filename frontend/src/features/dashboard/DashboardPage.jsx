import DashboardCard from "./DashboardCard";
import LowStockTable from "./LowStockTable";
import RecentOrdersTable from "./RecentOrdersTable";

import {
  dashboardStats,
  lowStockProducts,
  recentOrders,
} from "./dashboardMockData";

export default function DashboardPage() {
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
          xl:grid-cols-4
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
          products={lowStockProducts}
        />

        <RecentOrdersTable
          orders={recentOrders}
        />
      </div>
    </div>
  );
}