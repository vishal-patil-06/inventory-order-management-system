export default function Topbar() {
  return (
    <header
      className="
        h-20
        border-b
        border-slate-800
        px-8
        flex
        items-center
        justify-between
      "
    >
      <div>
        <h2 className="font-semibold">
          Inventory Management System
        </h2>

        <p className="text-sm text-slate-500">
          Manage products, customers and orders.
        </p>
      </div>

      <div
        className="
          px-4
          py-2
          rounded-xl
          bg-slate-900
          border
          border-slate-800
          text-sm
        "
      >
        Admin
      </div>
    </header>
  );
}