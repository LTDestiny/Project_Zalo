import React from "react";
import { useNavigate } from "react-router-dom";
import { ChangePasswordForm } from "../auth/ChangePasswordForm";
import { ArrowLeft, User, Bell, Shield, Palette } from "lucide-react";

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate("/chat")}
              className="flex items-center text-textPrimary hover:text-primary transition-colors mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Quay lại</span>
            </button>
            <h1 className="text-xl font-bold text-textPrimary">Cài đặt</h1>
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
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-white bg-primary rounded-lg transition-colors">
                  <Shield size={18} className="mr-3" />
                  Bảo mật
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-textSecondary hover:bg-gray-50 rounded-lg transition-colors">
                  <User size={18} className="mr-3" />
                  Thông tin cá nhân
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-textSecondary hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell size={18} className="mr-3" />
                  Thông báo
                </button>
                <button className="w-full flex items-center px-4 py-3 text-left text-sm font-medium text-textSecondary hover:bg-gray-50 rounded-lg transition-colors">
                  <Palette size={18} className="mr-3" />
                  Giao diện
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
