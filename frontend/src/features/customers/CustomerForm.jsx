export default function CustomerForm({
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
        name="fullName"
        value={formData.fullName}
        onChange={onChange}
        placeholder="Full Name"
        className="
          w-full
          p-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
        "
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email Address"
        className="
          w-full
          p-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
        "
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Phone Number"
        className="
          w-full
          p-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
        "
      />

      <button
        type="submit"
        className="
          bg-violet-600
          hover:bg-violet-700
          px-4
          py-3
          rounded-xl
        "
      >
        Save Customer
      </button>
    </form>
  );
}