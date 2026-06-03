import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
        flex
      "
    >
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}