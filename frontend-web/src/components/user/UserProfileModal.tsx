import React, { useEffect, useState } from "react";
import { User, UserStatus } from "@/types/user.types";
import { userApi } from "@/services/api/userApi";
import {
  X,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageCircle,
  UserPlus,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import {
  getStatusColor,
  getStatusText,
  formatDate,
  formatLastSeen,
} from "@/utils";

interface UserProfileModalProps {
  userId: string;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userId,
  onClose,
}) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await userApi.getUserById(userId);
        setUser(userData);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSendMessage = () => {
    if (user) {
      navigate(`/chat/${user.id}`);
      onClose();
    }
  };

  const handleAddFriend = () => {
    // TODO: Implement add friend functionality
    console.log("Add friend:", user?.id);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg p-8 shadow-xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg p-8 shadow-xl max-w-md">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <X size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Error</h3>
            <p className="text-gray-600 mb-6">{error || "User not found"}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <div className="relative">
              <img
                src={user.avatarUrl || "https://via.placeholder.com/120"}
                alt={user.username}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div
                className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(
                  user.status,
                )}`}
              />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              {user.displayName || user.username}
            </h2>
            <p className="text-gray-500">@{user.username}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div
                className={`w-2 h-2 rounded-full ${getStatusColor(
                  user.status,
                )}`}
              />
              <span className="text-sm text-gray-600">
                {getStatusText(user.status)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {isCurrentUser ? (
            <div className="mb-6">
              <button
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105"
              >
                <Shield size={20} />
                <span>Chỉnh sửa hồ sơ</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-3 mb-6">
              <button
                onClick={handleSendMessage}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105"
              >
                <MessageCircle size={20} />
                <span>Nhắn tin</span>
              </button>
              <button
                onClick={handleAddFriend}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
              >
                <UserPlus size={20} />
                <span>Kết bạn</span>
              </button>
            </div>
          )}

          {/* User Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Thông tin liên hệ
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={20} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                {user.phoneNumber && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone size={20} className="text-primary-600" />
                    <div>
                      <p className="text-xs text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{user.phoneNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Thông tin tài khoản
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar size={20} className="text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-500">Tham gia</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
                {user.status !== UserStatus.ONLINE && user.lastSeen && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Clock size={20} className="text-primary-600" />
                    <div>
                      <p className="text-xs text-gray-500">Truy cập lần cuối</p>
                      <p className="font-medium">
                        {formatLastSeen(user.lastSeen)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
