import React, { useState } from "react";
import { userApi } from "@/services/api/userApi";
import { User, UserStatus } from "@/types/user.types";
import { UserProfileModal } from "./UserProfileModal";

export const UserSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const results = await userApi.searchUsers(query);
      setUsers(results);
    } catch (err: any) {
      setError(err.response?.data?.message || "Search failed");
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Search Users</h2>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by username, email, or phone..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
            {error}
          </div>
        )}

        {users.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                <div className="relative">
                  <img
                    src={user.avatarUrl || "https://via.placeholder.com/50"}
                    alt={user.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                      user.status,
                    )}`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{user.username}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.phoneNumber && (
                    <p className="text-sm text-gray-500">{user.phoneNumber}</p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === UserStatus.ONLINE
                        ? "bg-green-100 text-green-800"
                        : user.status === UserStatus.AWAY
                          ? "bg-yellow-100 text-yellow-800"
                          : user.status === UserStatus.DO_NOT_DISTURB
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                  {user.lastSeen && user.status === UserStatus.OFFLINE && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(user.lastSeen).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          query &&
          !loading && (
            <p className="text-center text-gray-500">No users found</p>
          )
        )}

        {selectedUserId && (
          <UserProfileModal
            userId={selectedUserId}
            onClose={() => setSelectedUserId(null)}
          />
        )}
      </div>
    </div>
  );
};
