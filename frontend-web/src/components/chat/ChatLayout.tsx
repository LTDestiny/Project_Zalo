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
import { ChatList } from "./ChatList";
import { ChatItem } from "@/types/chat.types";
import { formatChatTimestamp } from "@/utils";
import { useUserStatus } from "@/hooks";

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

  // Manage user status
  useUserStatus();

  // Load users and create chat items
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        if (!user?.id) return;

        const allUsers = await userApi.getAllUsers();
        const filteredUsers = allUsers.filter((u) => u.id !== user.id);

        // Get friends list
        let friendsList: any[] = [];
        try {
          friendsList = await userApi.getFriends(user.id);
        } catch (error) {
          console.log("Friends list not available:", error);
        }
        const friendIds = new Set(friendsList.map((f) => f.id));

        // Convert users to chat items
        const chatItems: ChatItem[] = filteredUsers.map((u) => ({
          id: u.id,
          name: u.displayName || u.username,
          avatar: u.avatarUrl,
          lastMessage: "Bắt đầu cuộc trò chuyện",
          timestamp: "Mới",
          unreadCount: 0,
          isOnline: u.status === UserStatus.ONLINE,
          isFriend: friendIds.has(u.id),
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className="flex flex-col bg-white border-r border-gray-200 w-80">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-blue-600">Zola Chat</h1>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 transition rounded-full hover:bg-gray-100"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>

              {showMenu && (
                <div className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setShowMenu(false);
                    }}
                    className="flex items-center w-full gap-2 px-4 py-2 text-left hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    Cài đặt
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-50"
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
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 p-3 border-b border-gray-200">
          <button
            onClick={handleAddFriend}
            className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-medium">Thêm bạn</span>
          </button>
          <button
            onClick={handleCreateGroup}
            className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-green-600 transition rounded-lg bg-green-50 hover:bg-green-100"
          >
            <UsersRound className="w-5 h-5" />
            <span className="font-medium">Tạo nhóm</span>
          </button>
        </div>

        {/* Chat List */}
        <ChatList
          loading={loading}
          filteredChats={filteredChats}
          searchQuery={searchQuery}
          chatId={chatId}
          onChatClick={handleChatClick}
          onAvatarClick={setSelectedUserId}
          formatTimestamp={formatChatTimestamp}
        />

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
                  className="object-cover w-10 h-10 transition-all rounded-full hover:ring-2 hover:ring-primary-300"
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 font-semibold text-white transition-all rounded-full bg-gradient-to-br from-purple-400 to-purple-600 hover:ring-2 hover:ring-primary-300">
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
      <div className="flex flex-col flex-1 bg-white">
        {chatId ? (
          <ChatRoom />
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <MessageCircle className="w-24 h-24 mb-4 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-gray-600">
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
