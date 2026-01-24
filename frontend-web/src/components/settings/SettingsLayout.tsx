import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChangePasswordForm } from "../auth/ChangePasswordForm";
import { UserProfile } from "../user/UserProfile";
import { ArrowLeft, User, Shield, Bell, Palette } from "lucide-react";

type SettingsTab = "profile" | "security" | "notifications" | "appearance";

export const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on route
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    location.pathname === "/profile" ? "profile" : "security",
  );

  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
    if (tab === "profile") {
      navigate("/profile");
    } else {
      navigate("/settings");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "security":
        return <ChangePasswordForm />;
      case "notifications":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Cài đặt thông báo
            </h2>
            <p className="text-gray-600">Tính năng đang phát triển...</p>
          </div>
        );
      case "appearance":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Giao diện</h2>
            <p className="text-gray-600">Tính năng đang phát triển...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Quay lại</span>
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              {activeTab === "profile" ? "Hồ sơ" : "Cài đặt"}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => handleTabChange("profile")}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "text-white bg-primary-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <User size={18} className="mr-3" />
                  Hồ sơ cá nhân
                </button>
                <button
                  onClick={() => handleTabChange("security")}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "security"
                      ? "text-white bg-primary-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Shield size={18} className="mr-3" />
                  Bảo mật
                </button>
                <button
                  onClick={() => handleTabChange("notifications")}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "notifications"
                      ? "text-white bg-primary-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Bell size={18} className="mr-3" />
                  Thông báo
                </button>
                <button
                  onClick={() => handleTabChange("appearance")}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeTab === "appearance"
                      ? "text-white bg-primary-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Palette size={18} className="mr-3" />
                  Giao diện
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
