import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { authApi } from "@/services/api/authApi";
import { setCredentials } from "@/store/authSlice";
import { LoginRequest } from "@/types/user.types";
import { MessageCircle } from "lucide-react";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginRequest>({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(formData);
      localStorage.setItem("token", response.token);
      dispatch(setCredentials(response));
      navigate("/chat");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-xl">
              <MessageCircle
                size={40}
                className="text-white"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-textPrimary">Đăng nhập</h2>
          <p className="mt-2 text-sm text-textSecondary">
            Đăng nhập để tiếp tục sử dụng OTT Platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Tên đăng nhập hoặc email"
                value={formData.usernameOrEmail}
                onChange={(e) =>
                  setFormData({ ...formData, usernameOrEmail: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang đăng nhập...
                </span>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Chưa có tài khoản? <span className="underline">Đăng ký ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
