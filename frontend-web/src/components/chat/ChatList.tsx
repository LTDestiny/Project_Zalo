import React, { useState } from "react";
import { MessageCircle, Users as UsersIcon, UserPlus } from "lucide-react";
import { ChatItem } from "@/types/chat.types";
import { getUserInitials } from "@/utils";

interface ChatListProps {
  loading: boolean;
  filteredChats: ChatItem[];
  searchQuery: string;
  chatId: string | undefined;
  onChatClick: (chatId: string) => void;
  onAvatarClick: (userId: string) => void;
  formatTimestamp: (timestamp: string | number) => string;
}

export const ChatList: React.FC<ChatListProps> = ({
  loading,
  filteredChats,
  searchQuery,
  chatId,
  onChatClick,
  onAvatarClick,
  formatTimestamp,
}) => {
  const [activeTab, setActiveTab] = useState<"friends" | "strangers">(
    "friends",
  );

  // Phân loại chat thành bạn bè và người lạ
  const friends = filteredChats.filter((chat) => chat.isFriend);
  const strangers = filteredChats.filter((chat) => !chat.isFriend);
  const currentChats = activeTab === "friends" ? friends : strangers;

  const renderChatItem = (chat: Chat) => (
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
          onAvatarClick(chat.id);
        }}
        title="Xem hồ sơ"
      >
        {chat.avatar ? (
          <img
            src={chat.avatar}
            alt={chat.name}
            className="object-cover w-12 h-12 transition-all rounded-full hover:ring-2 hover:ring-primary-300"
          />
        ) : (
          <div
            className={`flex items-center justify-center w-12 h-12 font-semibold text-white transition-all rounded-full ${
              chat.isFriend
                ? "bg-gradient-to-br from-blue-400 to-blue-600 hover:ring-2 hover:ring-blue-300"
                : "bg-gray-400 hover:ring-2 hover:ring-yellow-300"
            }`}
          >
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
        onClick={() => onChatClick(chat.id)}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {chat.name}
            </h3>
            {!chat.isFriend && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                Người lạ
              </span>
            )}
          </div>
          <span className="flex-shrink-0 ml-2 text-xs text-gray-500">
            {formatTimestamp(chat.timestamp)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          {chat.unreadCount > 0 && (
            <span className="flex items-center justify-center flex-shrink-0 w-5 h-5 ml-2 text-xs font-semibold text-white bg-red-500 rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Friends/Strangers Tabs */}
      <div className="border-b-2 border-gray-200 bg-white shadow-sm">
        <div className="flex">
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              activeTab === "friends"
                ? "text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UsersIcon size={16} />
              <span>Bạn bè</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "friends"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {friends.length}
              </span>
            </div>
            {activeTab === "friends" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("strangers")}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition-all relative ${
              activeTab === "strangers"
                ? "text-yellow-600 bg-yellow-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={16} />
              <span>Người lạ</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === "strangers"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {strangers.length}
              </span>
            </div>
            {activeTab === "strangers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Chat List Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : currentChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 text-center text-gray-500">
            {activeTab === "friends" ? (
              <>
                <UsersIcon className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">
                  {searchQuery ? "Không tìm thấy bạn bè" : "Chưa có bạn bè"}
                </p>
                <p className="mt-1 text-xs">
                  Thêm bạn bè để bắt đầu trò chuyện
                </p>
              </>
            ) : (
              <>
                <UserPlus className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">
                  {searchQuery ? "Không tìm thấy người lạ" : "Chưa có người lạ"}
                </p>
                <p className="mt-1 text-xs">Tất cả đã là bạn bè</p>
              </>
            )}
          </div>
        ) : (
          <div>{currentChats.map((chat) => renderChatItem(chat))}</div>
        )}
      </div>
    </>
  );
};
