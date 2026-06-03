export default function OrderTable({
  orders,
  onView,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-left">
              Order ID
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Date
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t border-slate-800"
            >
              <td className="p-4">
                {order.id}
              </td>

              <td className="p-4">
                {order.customer}
              </td>

              <td className="p-4">
                ₹{order.amount}
              </td>

              <td className="p-4">
                <span
                  className={
                    order.status ===
                    "Completed"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }
                >
                  {order.status}
                </span>
              </td>

              <td className="p-4">
                {order.date}
              </td>

              <td className="p-4 flex gap-4">
                <button
                  onClick={() =>
                    onView(order)
                  }
                  className="text-blue-400"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onDelete(order.id)
                  }
                  className="text-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}