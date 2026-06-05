import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";

import { loginApi } from "../../../api/authApi";

import {
  saveOwner,
} from "../utils/authStorage";

export default function LoginPage() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (
    e
  ) => {
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

      const response =
        await loginApi(
          formData
        );

      saveOwner(
        response.data
      );

      navigate("/");
    } catch (error) {
      alert(
        error?.response?.data
          ?.detail ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-6">
        Welcome Back
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
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
            ? "Logging in..."
            : "Login"}
        </button>
        <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                to="/register"
                className="font-medium text-black hover:underline"
                >
                Create Account
                </Link>
            </p>
        </div>
      </form>
    </AuthLayout>
  );
}