import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Video,
  Users,
  Shield,
  Download,
  Globe,
  Smartphone,
  Monitor,
} from "lucide-react";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleGetStarted = () => {
    if (token) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MessageCircle
                size={32}
                className="text-primary"
                strokeWidth={2.5}
              />
              <span className="text-2xl font-bold text-primary">OTT PC</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                ZALO PC
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                OFFICIAL ACCOUNT
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                NHÀ PHÁT TRIỂN
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                BẢO MẬT
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                TRỢ GIÚP
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                LIÊN HỆ
              </a>
              <a
                href="#"
                className="text-textPrimary hover:text-primary font-medium transition-colors"
              >
                BÁO CÁO VI PHẠM
              </a>
            </div>
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <Globe size={20} className="text-textSecondary" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold text-textPrimary mb-6">
                Tải OTT PC cho máy tính
              </h1>
              <p className="text-xl text-textSecondary mb-4">
                Ứng dụng OTT PC đã có mặt trên Windows, Mac OS, Web
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  </div>
                  <span className="text-textSecondary">
                    Gửi file, ảnh, video cực nhanh lên đến 1GB
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  </div>
                  <span className="text-textSecondary">
                    Đồng bộ tin nhắn với điện thoại
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
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
                  </div>
                  <span className="text-textSecondary">
                    Tối ưu cho chat nhóm và trò đối công việc
                  </span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleGetStarted}
                  className="flex items-center space-x-2 px-8 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
                >
                  <Download size={20} />
                  <span>Tải ngay</span>
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 px-8 py-3.5 bg-white text-primary border-2 border-primary rounded-lg font-semibold hover:bg-primary-50 transition-all"
                >
                  <Globe size={20} />
                  <span>Dùng bản web</span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative">
                {/* Desktop mockup */}
                <div className="relative z-10">
                  <div className="bg-gray-800 rounded-t-xl p-2 shadow-2xl">
                    <div className="bg-white rounded-lg overflow-hidden">
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23F5F7FB' width='1200' height='800'/%3E%3Crect fill='%23FFFFFF' x='50' y='50' width='300' height='700' rx='10'/%3E%3Crect fill='%230084FF' x='70' y='80' width='260' height='60' rx='8' opacity='0.2'/%3E%3Crect fill='%230084FF' x='70' y='160' width='260' height='60' rx='8' opacity='0.15'/%3E%3Crect fill='%230084FF' x='70' y='240' width='260' height='60' rx='8' opacity='0.1'/%3E%3Crect fill='%23FFFFFF' x='380' y='50' width='770' height='700' rx='10'/%3E%3Crect fill='%230084FF' x='420' y='650' width='200' height='50' rx='25'/%3E%3C/svg%3E"
                        alt="OTT Desktop"
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-700 h-2 rounded-b-xl"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-t-lg"></div>
                </div>

                {/* Mobile mockup */}
                <div className="absolute -bottom-8 -left-8 w-32 z-20">
                  <div className="bg-gray-800 rounded-3xl p-2 shadow-xl">
                    <div className="bg-white rounded-2xl overflow-hidden">
                      <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 600'%3E%3Crect fill='%23F5F7FB' width='300' height='600'/%3E%3Crect fill='%230084FF' x='20' y='80' width='260' height='60' rx='8' opacity='0.2'/%3E%3Crect fill='%230084FF' x='20' y='160' width='260' height='60' rx='8' opacity='0.15'/%3E%3C/svg%3E"
                        alt="OTT Mobile"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-secondary py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-textPrimary text-center mb-12">
              Tính năng nổi bật
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Nhắn tin nhanh chóng
                </h3>
                <p className="text-textSecondary">
                  Gửi và nhận tin nhắn tức thì với công nghệ WebSocket. Trải
                  nghiệm nhắn tin không độ trễ.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Video size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Gọi video/voice
                </h3>
                <p className="text-textSecondary">
                  Gọi video và voice call chất lượng cao. Kết nối với nhiều
                  người cùng lúc.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Nhóm chat
                </h3>
                <p className="text-textSecondary">
                  Tạo nhóm cho đội nhóm, bạn bè hoặc gia đình. Cộng tác và kết
                  nối dễ dàng.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Shield size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Bảo mật tuyệt đối
                </h3>
                <p className="text-textSecondary">
                  Mã hóa end-to-end bảo vệ cuộc trò chuyện của bạn. Quyền riêng
                  tư là ưu tiên hàng đầu.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Đồng bộ đa nền tảng
                </h3>
                <p className="text-textSecondary">
                  Truy cập từ web, mobile, desktop. Tin nhắn đồng bộ liền mạch
                  trên mọi thiết bị.
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                  <Monitor size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-textPrimary mb-3">
                  Giao diện thân thiện
                </h3>
                <p className="text-textSecondary">
                  Thiết kế hiện đại, dễ sử dụng. Tối ưu hóa cho trải nghiệm
                  người dùng tốt nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-textPrimary mb-6">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-textSecondary mb-10 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người dùng tin tưởng OTT Platform cho nhu
            cầu giao tiếp hàng ngày.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleGetStarted}
              className="flex items-center space-x-2 px-10 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-dark transition-all shadow-md hover:shadow-lg"
            >
              <Download size={22} />
              <span>Tải OTT PC</span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 px-10 py-4 bg-white text-primary border-2 border-primary rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all"
            >
              <Globe size={22} />
              <span>Dùng bản web</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary py-12 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle size={24} className="text-primary" />
                  <span className="text-xl font-bold text-textPrimary">
                    OTT Platform
                  </span>
                </div>
                <p className="text-textSecondary text-sm">
                  Nền tảng giao tiếp hiện đại được xây dựng cho mọi người.
                </p>
              </div>
              <div>
                <h4 className="text-textPrimary font-semibold mb-4">
                  Sản phẩm
                </h4>
                <ul className="space-y-2 text-textSecondary text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Tính năng
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Bảng giá
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Bảo mật
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-textPrimary font-semibold mb-4">Công ty</h4>
                <ul className="space-y-2 text-textSecondary text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Về chúng tôi
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Tuyển dụng
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-textPrimary font-semibold mb-4">Hỗ trợ</h4>
                <ul className="space-y-2 text-textSecondary text-sm">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Trung tâm trợ giúp
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Liên hệ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Chính sách bảo mật
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-300 pt-8 text-center text-textSecondary text-sm">
              <p>
                &copy; 2012 - 2026 Một sản phẩm của OTT Platform -{" "}
                <a href="#" className="text-primary hover:underline">
                  Điều khoản sử dụng dịch vụ
                </a>{" "}
                -{" "}
                <a href="#" className="text-primary hover:underline">
                  Thông báo xử lý dữ liệu
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
