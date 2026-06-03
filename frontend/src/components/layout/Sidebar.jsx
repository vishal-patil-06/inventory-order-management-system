import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    label: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-72
        border-r
        border-slate-800
        bg-slate-950
        flex
        flex-col
      "
    >
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          InventoryFlow
        </h1>

        <p className="text-slate-500 text-sm mt-2">
          Inventory Management
        </p>
      </div>

      <nav className="flex-1 px-4">
        <div className="mb-3 text-xs uppercase text-slate-500">
          Overview
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                mb-2
                transition
                ${
                  isActive
                    ? "bg-violet-600/20 text-violet-400"
                    : "text-slate-400 hover:bg-slate-900"
                }
              `
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div
        className="
          border-t
          border-slate-800
          p-5
          text-sm
          text-slate-500
        "
      >
        Ethara Assessment
      </div>
    </aside>
  );
}