import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api/authApi";
import { MessageCircle } from "lucide-react";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      // Auto login after successful registration
      const loginResponse = await authApi.login({
        usernameOrEmail: formData.username,
        password: formData.password,
      });

      localStorage.setItem("token", loginResponse.token);
      navigate("/chat");
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed");
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
          <h2 className="text-3xl font-bold text-textPrimary">
            Đăng ký tài khoản
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Tạo tài khoản mới để sử dụng OTT Platform
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-textPrimary mb-2"
              >
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                required
                minLength={3}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Chọn tên đăng nhập"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-textPrimary mb-2"
              >
                Địa chỉ email
              </label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-textPrimary mb-2"
              >
                Số điện thoại (Tùy chọn)
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+84 123 456 789"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-textPrimary mb-2"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Ít nhất 8 ký tự"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-textPrimary mb-2"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
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
                  Đang đăng ký...
                </span>
              ) : (
                "Đăng ký"
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Đã có tài khoản? <span className="underline">Đăng nhập ngay</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
