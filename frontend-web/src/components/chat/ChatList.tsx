import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import { userApi } from "@/services/api/userApi";
import { User, UserStatus } from "@/types/user.types";
import { UserProfileModal } from "@/components/user/UserProfileModal";
import { Users as UsersIcon, UserPlus } from "lucide-react";

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [friends, setFriends] = useState<User[]>([]);
  const [strangers, setStrangers] = useState<User[]>([]);
  const [chatListTab, setChatListTab] = useState<"friends" | "strangers">("friends");
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Load users - only get users with messages
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        if (!user?.id) return;

        const users = await userApi.getOnlineUsers();
        const filteredUsers = users.filter((u) => u.id !== user.id);

        // Get friends list and separate friends/strangers
        const friendsList = await userApi.getFriends(user.id);
        const friendIds = new Set(friendsList.map((f) => f.id));

        const friendsWithMessages = filteredUsers.filter((u) =>
          friendIds.has(u.id),
        );
        const strangersWithMessages = filteredUsers.filter(
          (u) => !friendIds.has(u.id),
        );

        // Sort by lastSeen (most recent first)
        setFriends(sortByLastSeen(friendsWithMessages));
        setStrangers(sortByLastSeen(strangersWithMessages));
      } catch (error) {
        console.error("Failed to load users:", error);
        setFriends([]);
        setStrangers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
    // Refresh every 30 seconds
    const interval = setInterval(loadUsers, 30000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const handleShowProfile = (userId: string) => {
    setSelectedUserId(userId);
  };

  // Sort users by lastSeen (most recent first)
  const sortByLastSeen = (users: User[]): User[] => {
    return [...users].sort((a, b) => {
      // Online users first
      if (a.status === UserStatus.ONLINE && b.status !== UserStatus.ONLINE) return -1;
      if (a.status !== UserStatus.ONLINE && b.status === UserStatus.ONLINE) return 1;
      
      // Then sort by lastSeen
      const aTime = a.lastSeen ? new Date(a.lastSeen).getTime() : 0;
      const bTime = b.lastSeen ? new Date(b.lastSeen).getTime() : 0;
      return bTime - aTime; // Most recent first
    });
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
        return "bg-gray-400";
    }
  };

  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return "";
    const date = new Date(lastSeen);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Vừa xong";
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    return `${days} ngày trước`;
  };

  return (
    <>
      {/* Friends/Strangers Tabs */}
      <div className="border-b-2 border-gray-200 bg-white shadow-sm">
        <div className="flex">
          <button
            onClick={() => setChatListTab("friends")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              chatListTab === "friends"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UsersIcon size={16} />
              <span>Bạn bè</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                chatListTab === "friends" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}>
                {friends.length}
              </span>
            </div>
            {chatListTab === "friends" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setChatListTab("strangers")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              chatListTab === "strangers"
                ? "text-yellow-600 bg-yellow-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={16} />
              <span>Người lạ</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                chatListTab === "strangers" 
                  ? "bg-yellow-500 text-white" 
                  : "bg-gray-200 text-gray-700"
              }`}>
                {strangers.length}
              </span>
            </div>
            {chatListTab === "strangers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Chat List Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <p>Đang tải...</p>
          </div>
        ) : chatListTab === "friends" ? (
          friends.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <UsersIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>Chưa có bạn bè</p>
              <p className="text-sm mt-2">Thêm bạn bè để bắt đầu trò chuyện</p>
            </div>
          ) : (
            <div>
              {friends.map((u) => (
                <div
                  key={u.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
                  onClick={() => handleChatClick(u.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowProfile(u.id);
                        }}
                        className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-blue-300 transition-all"
                        title="Xem hồ sơ"
                      >
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(u.status)} border-2 border-white rounded-full`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {u.username}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {u.status === UserStatus.ONLINE
                            ? "Online"
                            : formatLastSeen(u.lastSeen)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{u.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          strangers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <UserPlus size={48} className="mx-auto mb-4 opacity-50" />
              <p>Chưa có người lạ</p>
              <p className="text-sm mt-2">Tất cả đã là bạn bè</p>
            </div>
          ) : (
            <div>
              {strangers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
                  onClick={() => handleChatClick(u.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowProfile(u.id);
                        }}
                        className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-yellow-300 transition-all"
                        title="Xem hồ sơ"
                      >
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(u.status)} border-2 border-white rounded-full`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {u.username}
                          </h3>
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                            Người lạ
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {u.status === UserStatus.ONLINE
                            ? "Online"
                            : formatLastSeen(u.lastSeen)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{u.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </>
  );
};
