import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import { registerApi } from "../../../api/authApi";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerApi(
        formData
      );

      alert(
        "Registration successful"
      );

      navigate("/login");
    } catch (error) {
      alert(
        error?.response?.data
          ?.detail ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={
            formData.full_name
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          className="w-full border rounded-lg p-3 mb-6"
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white rounded-lg p-3"
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}