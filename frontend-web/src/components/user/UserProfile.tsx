import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import { userApi } from "@/services/api/userApi";
import { User, UserStatus } from "@/types/user.types";

export const UserProfile: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [user, setUser] = useState<User | null>(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    avatarUrl: user?.avatarUrl || "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber || "",
        avatarUrl: currentUser.avatarUrl || "",
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (user) {
        const updatedUser = await userApi.updateProfile(user.id, formData);
        setUser(updatedUser);
        setIsEditing(false);
        setSuccess("Profile updated successfully");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: UserStatus) => {
    setLoading(true);
    try {
      if (user) {
        const updatedUser = await userApi.updateStatus(user.id, newStatus);
        setUser(updatedUser);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ONLINE:
        return "bg-green-500";
      case UserStatus.OFFLINE:
        return "bg-gray-500";
      case UserStatus.AWAY:
        return "bg-yellow-500";
      case UserStatus.DO_NOT_DISTURB:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/100"}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(
                user.status
              )}`}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              {user.lastSeen
                ? `Last seen: ${new Date(user.lastSeen).toLocaleString()}`
                : "Online"}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
            {success}
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <div className="flex flex-wrap gap-2">
            {Object.values(UserStatus).map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  user.status === status
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } disabled:opacity-50`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                value={formData.avatarUrl}
                onChange={(e) =>
                  setFormData({ ...formData, avatarUrl: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{user.phoneNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium">{user.status}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
