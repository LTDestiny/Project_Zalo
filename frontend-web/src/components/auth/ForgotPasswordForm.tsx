import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api/authApi";
import { Mail, ArrowLeft } from "lucide-react";

export const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await authApi.forgotPassword({ email });
      setSuccess(response.message || "Email đặt lại mật khẩu đã được gửi!");
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Không thể gửi email. Vui lòng thử lại.",
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
              <Mail size={40} className="text-white" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-textPrimary">
            Quên mật khẩu?
          </h2>
          <p className="mt-2 text-sm text-textSecondary">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4 border border-green-200">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Địa chỉ email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                required
                className="appearance-none relative block w-full pl-10 px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-textPrimary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
