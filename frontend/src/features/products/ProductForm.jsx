export default function ProductForm({
  formData,
  onChange,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      <input
        name="name"
        value={formData.name}
        onChange={onChange}
        placeholder="Product Name"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      />

      <input
        name="code"
        value={formData.code}
        onChange={onChange}
        placeholder="Product Code"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={onChange}
        placeholder="Price"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      />

      <input
        name="stockQuantity"
        type="number"
        value={formData.stockQuantity}
        onChange={onChange}
        placeholder="Stock Quantity"
        className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700"
      />

      <button
        className="
        bg-violet-600
        hover:bg-violet-700
        px-4
        py-3
        rounded-xl
      "
      >
        Save Product
      </button>
    </form>
  );
}