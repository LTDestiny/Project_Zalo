import React, { useState } from "react";
import { authApi } from "@/services/api/authApi";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError("Mật khẩu mới phải khác mật khẩu cũ");
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setSuccess(response.message || "Đổi mật khẩu thành công!");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Không thể đổi mật khẩu. Vui lòng kiểm tra mật khẩu cũ.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <Lock size={24} className="text-primary" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-textPrimary">Đổi mật khẩu</h2>
        </div>
        <p className="text-sm text-textSecondary ml-14">
          Cập nhật mật khẩu của bạn để bảo mật tài khoản
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-sm text-green-800">{success}</p>
          </div>
        )}

        <div>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-textPrimary mb-2"
          >
            Mật khẩu hiện tại
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              required
              className="appearance-none relative block w-full pl-10 pr-10 px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Nhập mật khẩu hiện tại"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({ ...formData, oldPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-textPrimary mb-2"
          >
            Mật khẩu mới
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              required
              minLength={8}
              className="appearance-none relative block w-full pl-10 pr-10 px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Ít nhất 8 ký tự"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-textPrimary mb-2"
          >
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="appearance-none relative block w-full pl-10 pr-10 px-4 py-3 border border-gray-300 placeholder-gray-400 text-textPrimary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Nhập lại mật khẩu mới"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() =>
              setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
            className="py-2 px-6 border border-gray-300 text-sm font-medium rounded-lg text-textPrimary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-6 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
};
