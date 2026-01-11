import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { clearCredentials } from "@/store/authSlice";
import { userApi } from "@/services/api/userApi";
import { User, UserStatus } from "@/types/user.types";
import {
  MessageCircle,
  Users as UsersIcon,
  LogOut,
  UserPlus,
  UsersRound,
  X,
  Mail,
  Phone,
  Calendar,
  Clock,
} from "lucide-react";

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"chats" | "users">("chats");
  const [loading, setLoading] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);

  // Update user status to ONLINE on mount
  useEffect(() => {
    if (user?.id) {
      userApi.updateStatus(user.id, UserStatus.ONLINE).catch(console.error);
    }
  }, [user?.id]);

  // Load users based on active tab
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const users =
          activeTab === "chats"
            ? await userApi.getOnlineUsers()
            : await userApi.getAllUsers();
        setDisplayUsers(users.filter((u) => u.id !== user?.id));
      } catch (error) {
        console.error("Failed to load users:", error);
        setDisplayUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
    // Refresh online users every 30 seconds for chats tab
    if (activeTab === "chats") {
      const interval = setInterval(loadUsers, 30000);
      return () => clearInterval(interval);
    }
  }, [activeTab, user?.id]);

  const handleLogout = async () => {
    try {
      // Update status to offline before logout
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

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  const handleAddFriend = () => {
    setShowAddFriendModal(true);
  };

  const handleCreateGroup = () => {
    setShowCreateGroupModal(true);
    setSelectedUsers([]);
    setGroupName("");
  };

  const handleToggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleConfirmCreateGroup = () => {
    if (groupName.trim() && selectedUsers.length >= 2) {
      console.log("Creating group:", { groupName, members: selectedUsers });
      // TODO: Call API to create group
      setShowCreateGroupModal(false);
      setGroupName("");
      setSelectedUsers([]);
    }
  };

  const handleShowProfile = (selectedUser: User) => {
    setSelectedProfile(selectedUser);
    setShowProfileModal(true);
  };

  const filteredUsers = displayUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAddFriend}
                className="p-2 text-primary hover:bg-primary-50 rounded-full transition-all transform hover:scale-110 active:scale-95"
                title="Thêm bạn"
              >
                <UserPlus size={20} />
              </button>
              <button
                onClick={handleCreateGroup}
                className="p-2 text-primary hover:bg-primary-50 rounded-full transition-all transform hover:scale-110 active:scale-95"
                title="Tạo nhóm"
              >
                <UsersRound size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all transform hover:scale-110 active:scale-95"
                title="Đăng xuất"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Current User Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div
              onClick={() => user && handleShowProfile(user)}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              title="Xem hồ sơ"
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">{user?.username}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("chats")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
                activeTab === "chats"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <MessageCircle size={18} className="inline mr-2" />
              Chats
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 ${
                activeTab === "users"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <UsersIcon size={18} className="inline mr-2" />
              Người dùng
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              <p>Đang tải...</p>
            </div>
          ) : displayUsers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>
                {activeTab === "chats"
                  ? "Chưa có người dùng online"
                  : "Chưa có người dùng"}
              </p>
              <p className="text-sm mt-2">
                {activeTab === "chats"
                  ? "Không có người dùng nào đang online"
                  : "Chưa có người dùng nào trong hệ thống"}
              </p>
            </div>
          ) : (
            <div>
              {displayUsers.map((u) => {
                const getStatusColor = () => {
                  switch (u.status) {
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
                  <div
                    key={u.id}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowProfile(u);
                          }}
                          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:ring-2 hover:ring-primary-300 transition-all"
                          title="Xem hồ sơ"
                        >
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor()} border-2 border-white rounded-full`}
                        ></div>
                      </div>
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() => handleChatClick(u.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">
                            {u.username}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {u.status === UserStatus.ONLINE
                              ? "Online"
                              : formatLastSeen(u.lastSeen)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Empty State */}
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-400">
          <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
          <h2 className="text-2xl font-semibold mb-2">Select a chat</h2>
          <p>Choose a conversation from the list to start messaging</p>
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-slideUp">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <UserPlus size={24} className="mr-2 text-primary" />
                Thêm bạn bè
              </h2>
              <button
                onClick={() => setShowAddFriendModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all transform hover:rotate-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <div className="mt-4 max-h-96 overflow-y-auto">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <UsersIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Không tìm thấy người dùng</p>
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                          {u.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {u.username}
                          </h3>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95">
                        Thêm
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 animate-slideUp">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <UsersRound size={24} className="mr-2 text-primary" />
                Tạo nhóm mới
              </h2>
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all transform hover:rotate-90"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <input
                type="text"
                placeholder="Tên nhóm..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-600 mb-3">
                Chọn thành viên (tối thiểu 2 người):
              </p>
              <div className="max-h-72 overflow-y-auto space-y-2">
                {displayUsers.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => handleToggleUserSelection(u.id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                      selectedUsers.includes(u.id)
                        ? "bg-primary-50 border-2 border-primary"
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {u.username}
                        </h3>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedUsers.includes(u.id)
                          ? "bg-primary border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedUsers.includes(u.id) && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleConfirmCreateGroup}
                disabled={!groupName.trim() || selectedUsers.length < 2}
                className="w-full mt-4 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
              >
                Tạo nhóm ({selectedUsers.length} thành viên)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showProfileModal && selectedProfile && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-primary to-green-600 h-32 z-0">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-full transition-all transform hover:rotate-90 z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Avatar */}
            <div className="flex justify-center -mt-16 mb-4 relative z-10">
              <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-white font-bold text-5xl ring-4 ring-white shadow-lg">
                {selectedProfile.username.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {selectedProfile.username}
              </h2>

              {/* Status Badge */}
              <div className="flex justify-center mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProfile.status === UserStatus.ONLINE
                      ? "bg-green-100 text-green-700"
                      : selectedProfile.status === UserStatus.AWAY
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedProfile.status === UserStatus.DO_NOT_DISTURB
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {selectedProfile.status === UserStatus.ONLINE
                    ? "🟢 Trực tuyến"
                    : selectedProfile.status === UserStatus.AWAY
                    ? "🟡 Vắng mặt"
                    : selectedProfile.status === UserStatus.DO_NOT_DISTURB
                    ? "🔴 Không làm phiền"
                    : "⚫ Ngoại tuyến"}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-primary" size={20} />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-800">
                      {selectedProfile.email}
                    </p>
                  </div>
                </div>

                {selectedProfile.phoneNumber && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="text-primary" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Số điện thoại</p>
                      <p className="text-sm font-medium text-gray-800">
                        {selectedProfile.phoneNumber}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProfile.createdAt && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-primary" size={20} />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Tham gia</p>
                      <p className="text-sm font-medium text-gray-800">
                        {new Date(selectedProfile.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {selectedProfile.lastSeen &&
                  selectedProfile.status !== UserStatus.ONLINE && (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="text-primary" size={20} />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">
                          Truy cập lần cuối
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(selectedProfile.lastSeen).toLocaleString(
                            "vi-VN",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              {selectedProfile.id !== user?.id && (
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={() => {
                      handleChatClick(selectedProfile.id);
                      setShowProfileModal(false);
                    }}
                    className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle size={18} />
                    <span>Nhắn tin</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log("Add friend:", selectedProfile.id);
                      // TODO: Implement add friend functionality
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
                  >
                    <UserPlus size={18} />
                    <span>Kết bạn</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
