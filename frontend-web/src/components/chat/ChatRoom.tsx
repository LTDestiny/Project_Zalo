import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import { userApi } from "@/services/api/userApi";
import { UserProfileModal } from "@/components/user/UserProfileModal";
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Image as ImageIcon,
} from "lucide-react";
import { Message, MessageType, MessageStatus } from "../../types/message.types";
import { User } from "@/types/user.types";
import { formatTime, getDisplayName, getUserInitials } from "@/utils";

export const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat user info
  useEffect(() => {
    const loadChatUser = async () => {
      if (!chatId) return;

      setLoading(true);
      try {
        const users = await userApi.getAllUsers();
        const foundUser = users.find((u) => u.id === chatId);
        if (foundUser) {
          setChatUser(foundUser);
        }
      } catch (error) {
        console.error("Failed to load chat user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChatUser();
  }, [chatId]);

  useEffect(() => {
    // Mock messages - replace with API call
    const mockMessages: Message[] = [
      {
        messageId: "1",
        conversationId: chatId || "",
        senderId: "other-user-id",
        type: MessageType.TEXT,
        content: "Hello! How are you?",
        timestamp: Date.now() - 3600000,
        status: MessageStatus.READ,
        readBy: [user?.id || ""],
      },
      {
        messageId: "2",
        conversationId: chatId || "",
        senderId: user?.id || "",
        type: MessageType.TEXT,
        content: "Hi! I am good, thank you. How about you?",
        timestamp: Date.now() - 3000000,
        status: MessageStatus.READ,
        readBy: ["other-user-id"],
      },
      {
        messageId: "3",
        conversationId: chatId || "",
        senderId: "other-user-id",
        type: MessageType.TEXT,
        content: "I am doing great! Are we still on for tomorrow?",
        timestamp: Date.now() - 1800000,
        status: MessageStatus.READ,
        readBy: [user?.id || ""],
      },
      {
        messageId: "4",
        conversationId: chatId || "",
        senderId: user?.id || "",
        type: MessageType.TEXT,
        content: "Yes, absolutely! Looking forward to it.",
        timestamp: Date.now() - 900000,
        status: MessageStatus.DELIVERED,
        readBy: [],
      },
    ];
    setMessages(mockMessages);
  }, [chatId, user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      messageId: Date.now().toString(),
      conversationId: chatId || "",
      senderId: user?.id || "",
      type: MessageType.TEXT,
      content: inputMessage,
      timestamp: Date.now(),
      status: MessageStatus.SENDING,
      readBy: [],
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate message sent
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === newMessage.messageId
            ? { ...msg, status: MessageStatus.SENT }
            : msg,
        ),
      );
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!chatUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        <p>Không tìm thấy người dùng</p>
      </div>
    );
  }

  const userName = getDisplayName(chatUser);
  const isOnline = chatUser.status === "ONLINE";

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowProfileModal(true)}
              title="Xem hồ sơ"
            >
              {chatUser.avatarUrl ? (
                <img
                  src={chatUser.avatarUrl}
                  alt={userName}
                  className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-primary-300 transition-all"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold hover:ring-2 hover:ring-primary-300 transition-all">
                  {getUserInitials(userName)}
                </div>
              )}
              {isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            >
              <h2 className="font-semibold text-gray-800 hover:text-primary transition-colors">
                {userName}
              </h2>
              <p className="text-sm text-gray-500">
                {isOnline ? "Đang hoạt động" : "Không hoạt động"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#E5DDD5]">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-sm">Chưa có tin nhắn nào</p>
            <p className="text-xs mt-1">
              Gửi tin nhắn đầu tiên để bắt đầu trò chuyện
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.messageId}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs lg:max-w-md`}>
                  <div
                    className={`rounded-lg px-4 py-2 shadow-sm ${
                      isOwn
                        ? "bg-[#DCF8C6] text-gray-800"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                  </div>
                  <div
                    className={`flex items-center mt-1 gap-1 ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-gray-600">
                      {formatTime(message.timestamp)}
                    </span>
                    {isOwn && (
                      <span className="text-xs text-gray-600">
                        {message.status === MessageStatus.SENDING && "◷"}
                        {message.status === MessageStatus.SENT && "✓"}
                        {message.status === MessageStatus.DELIVERED && "✓✓"}
                        {message.status === MessageStatus.READ && (
                          <span className="text-blue-500">✓✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <Smile size={22} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <Paperclip size={22} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <ImageIcon size={22} className="text-gray-600" />
          </button>
          <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2.5 border border-gray-200">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-transparent outline-none text-gray-800"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className={`p-3 rounded-full transition-colors ${
              inputMessage.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* User Profile Modal */}
      {showProfileModal && chatId && (
        <UserProfileModal
          userId={chatId}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};
