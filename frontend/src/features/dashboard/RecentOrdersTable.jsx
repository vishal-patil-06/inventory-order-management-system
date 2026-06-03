export default function RecentOrdersTable({
  orders,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
      "
    >
      <h3 className="text-xl font-semibold mb-5">
        Recent Orders
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-slate-400 text-left">
              <th className="pb-4">Order</th>
              <th className="pb-4">Customer</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="
                  border-t
                  border-slate-800
                "
              >
                <td className="py-4">
                  {order.id}
                </td>

                <td className="py-4">
                  {order.customer}
                </td>

                <td className="py-4">
                  {order.amount}
                </td>

                <td className="py-4">
                  <span
                    className={
                      order.status ===
                      "Completed"
                        ? `
                        px-3
                        py-1
                        rounded-full
                        bg-green-500/20
                        text-green-400
                        text-xs
                      `
                        : `
                        px-3
                        py-1
                        rounded-full
                        bg-yellow-500/20
                        text-yellow-400
                        text-xs
                      `
                    }
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}