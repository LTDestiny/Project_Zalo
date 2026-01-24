import React, { useState, useEffect } from "react";
import { userApi } from "@/services/api/userApi";
import { User, UserStatus } from "@/types/user.types";
import { UserProfileModal } from "./UserProfileModal";

export const OnlineUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchOnlineUsers();
    // Refresh every 30 seconds
    const interval = setInterval(fetchOnlineUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOnlineUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const onlineUsers = await userApi.getOnlineUsers();
      setUsers(onlineUsers);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch online users");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case UserStatus.ONLINE:
        return "bg-green-500";
      case UserStatus.AWAY:
        return "bg-yellow-500";
      case UserStatus.DO_NOT_DISTURB:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Online Users ({users.length})</h2>
        <button
          onClick={fetchOnlineUsers}
          disabled={loading}
          className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
          {error}
        </div>
      )}

      {loading && users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : users.length > 0 ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all transform hover:scale-[1.02]"
            >
              <div className="relative">
                <img
                  src={user.avatarUrl || "https://via.placeholder.com/40"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                    user.status,
                  )}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">
                  {user.username}
                </h3>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === UserStatus.ONLINE
                      ? "bg-green-100 text-green-800"
                      : user.status === UserStatus.AWAY
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No users online</div>
      )}

      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};
