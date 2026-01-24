import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { userApi } from "../../services/api/userApi";
import { User, Mail, Phone, Calendar, Shield, Upload } from "lucide-react";

interface UserProfileData {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
  avatarUrl: string;
}

export const UserProfile: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    fetchProfile();
  }, [currentUser?.id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getUserById(currentUser?.id || "");
      setProfile(data);
      setFormData({
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber || "",
        dateOfBirth: data.dateOfBirth || "",
      });
    } catch (err) {
      setError("Không thể tải thông tin hồ sơ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-red-500">
          {error || "Không tìm thấy thông tin người dùng"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Hồ sơ cá nhân</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Lưu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 text-4xl font-bold">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                <Upload size={16} />
              </button>
            )}
          </div>
          {!isEditing && (
            <div className="text-center mt-4">
              <h3 className="text-2xl font-bold text-gray-800">
                {profile.username}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                Tên người dùng
              </div>
            </label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                {profile.username}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                Email
              </div>
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                {profile.email}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                Số điện thoại
              </div>
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Chưa cập nhật"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                {profile.phoneNumber || "Chưa cập nhật"}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                Ngày sinh
              </div>
            </label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            ) : (
              <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
                {profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString("vi-VN")
                  : "Chưa cập nhật"}
              </div>
            )}
          </div>

          {/* Role (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Shield size={16} className="mr-2" />
                Vai trò
              </div>
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
              {profile.role}
            </div>
          </div>

          {/* Created At (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                Ngày tham gia
              </div>
            </label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-gray-800">
              {new Date(profile.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
