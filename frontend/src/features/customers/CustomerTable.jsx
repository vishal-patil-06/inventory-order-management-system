export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        overflow-hidden
      "
    >
      <table className="w-full">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-left">
              Name
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Phone
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="
                border-t
                border-slate-800
              "
            >
              <td className="p-4">
                {customer.full_name}
              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.phone}
              </td>

              <td className="p-4 flex gap-4">
                <button
                  onClick={() =>
                    onEdit(customer)
                  }
                  className="text-blue-400"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onDelete(customer.id)
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