import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { clearCredentials } from "@/store/authSlice";
import { userApi } from "@/services/api/userApi";
import { UserStatus } from "@/types/user.types";
import { UserProfileModal } from "@/components/user/UserProfileModal";
import {
  MessageCircle,
  UserPlus,
  UsersRound,
  LogOut,
  Search,
  MoreVertical,
  Settings,
} from "lucide-react";
import { ChatRoom } from "./ChatRoom";

interface ChatItem {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const ChatLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { chatId } = useParams<{ chatId?: string }>();
  const { user } = useAppSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Update user status to ONLINE on mount
  useEffect(() => {
    if (user?.id) {
      userApi.updateStatus(user.id, UserStatus.ONLINE).catch(console.error);
    }
  }, [user?.id]);

  // Load users and create chat items
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await userApi.getAllUsers();
        const filteredUsers = allUsers.filter((u) => u.id !== user?.id);

        // Convert users to chat items (mock data for now)
        const chatItems: ChatItem[] = filteredUsers.map((u) => ({
          id: u.id,
          name: u.displayName || u.username,
          avatar: u.avatarUrl,
          lastMessage: "Bắt đầu cuộc trò chuyện",
          timestamp: "Mới",
          unreadCount: 0,
          isOnline: u.status === UserStatus.ONLINE,
        }));
        setChats(chatItems);
      } catch (error) {
        console.error("Failed to load users:", error);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
    // Refresh every 30 seconds
    const interval = setInterval(loadUsers, 30000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      if (user?.id) {
        await userApi.updateStatus(user.id, UserStatus.OFFLINE);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      localStorage.removeItem("token");
      dispatch(clearCredentials());
      navigate("/login");
    }
  };

  const handleChatClick = (chatUserId: string) => {
    navigate(`/chat/${chatUserId}`);
  };

  const handleAddFriend = () => {
    // TODO: Implement add friend modal
    console.log("Add friend clicked");
  };

  const handleCreateGroup = () => {
    // TODO: Implement create group modal
    console.log("Create group clicked");
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatTimestamp = (timestamp: string) => {
    if (timestamp === "Mới") return timestamp;
    return timestamp;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-blue-600">Zola Chat</h1>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Cài đặt
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 border-b border-gray-200 flex gap-2">
          <button
            onClick={handleAddFriend}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-medium">Thêm bạn</span>
          </button>
          <button
            onClick={handleCreateGroup}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
          >
            <UsersRound className="w-5 h-5" />
            <span className="font-medium">Tạo nhóm</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 px-6 text-center">
              <MessageCircle className="w-12 h-12 mb-3 text-gray-300" />
              <p className="text-sm">
                {searchQuery
                  ? "Không tìm thấy kết quả"
                  : "Chưa có cuộc trò chuyện nào"}
              </p>
              <p className="text-xs mt-1">Nhấn "Thêm bạn" để bắt đầu</p>
            </div>
          ) : (
            <div>
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition ${
                    chatId === chat.id ? "bg-blue-50" : ""
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className="relative flex-shrink-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUserId(chat.id);
                    }}
                    title="Xem hồ sơ"
                  >
                    {chat.avatar ? (
                      <img
                        src={chat.avatar}
                        alt={chat.name}
                        className="w-12 h-12 rounded-full object-cover hover:ring-2 hover:ring-primary-300 transition-all"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-primary-300 transition-all">
                        {chat.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => handleChatClick(chat.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {formatTimestamp(chat.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unreadCount > 0 && (
                        <span className="flex-shrink-0 ml-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                          {chat.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div
              className="cursor-pointer"
              onClick={() => user?.id && setSelectedUserId(user.id)}
              title="Xem hồ sơ của tôi"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName || user?.username}
                  className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary-300 transition-all"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-primary-300 transition-all">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">
                {user?.displayName || user?.username}
              </h3>
              <p className="text-xs text-green-600">Đang hoạt động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {chatId ? (
          <ChatRoom />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-24 h-24 mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Chào mừng đến với Zola Chat
            </h2>
            <p className="text-gray-500">
              Chọn một cuộc trò chuyện để bắt đầu nhắn tin
            </p>
          </div>
        )}
      </div>

      {/* User Profile Modal */}
      {selectedUserId && (
        <UserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
};
