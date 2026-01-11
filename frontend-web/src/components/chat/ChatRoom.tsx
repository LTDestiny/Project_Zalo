import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store/store";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import { Message, MessageType, MessageStatus } from "../../types/message.types";

export const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatUser] = useState({
    id: chatId,
    name: "Nguyen Van A",
    isOnline: true,
    lastSeen: "Active now",
  });

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
            : msg
        )
      );
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Container */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/chat")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="relative">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                  {chatUser.name.charAt(0).toUpperCase()}
                </div>
                {chatUser.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{chatUser.name}</h2>
                <p className="text-sm text-gray-500">{chatUser.lastSeen}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.messageId}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md ${
                    isOwn ? "order-2" : "order-1"
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      isOwn
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                  </div>
                  <div
                    className={`flex items-center mt-1 space-x-1 ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                    {isOwn && (
                      <span className="text-xs text-gray-500">
                        {message.status === MessageStatus.SENDING && "◷"}
                        {message.status === MessageStatus.SENT && "✓"}
                        {message.status === MessageStatus.DELIVERED && "✓✓"}
                        {message.status === MessageStatus.READ && "✓✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Paperclip size={20} className="text-gray-600" />
            </button>
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none text-gray-800"
              />
              <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <Smile size={20} className="text-gray-600" />
              </button>
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
      </div>
    </div>
  );
};
