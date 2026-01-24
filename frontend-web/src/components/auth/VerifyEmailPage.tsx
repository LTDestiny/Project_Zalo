import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "@/services/api/authApi";
import { CheckCircle, XCircle, Mail, Loader2 } from "lucide-react";

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token xác thực không hợp lệ");
        return;
      }

      try {
        const response = await authApi.verifyEmail({ token });
        setStatus("success");
        setMessage(response.message || "Email đã được xác thực thành công!");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err: any) {
        setStatus("error");
        setMessage(
          err.response?.data?.message ||
            "Không thể xác thực email. Token có thể đã hết hạn."
        );
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const handleResendVerification = async () => {
    try {
      const response = await authApi.resendVerification();
      setMessage(response.message || "Email xác thực đã được gửi lại!");
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
          "Không thể gửi lại email xác thực. Vui lòng đăng nhập để thử lại."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {status === "loading" && (
              <div className="p-3 bg-blue-100 rounded-xl">
                <Loader2
                  size={40}
                  className="text-blue-600 animate-spin"
                  strokeWidth={2.5}
                />
              </div>
            )}
            {status === "success" && (
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle
                  size={40}
                  className="text-green-600"
                  strokeWidth={2.5}
                />
              </div>
            )}
            {status === "error" && (
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle
                  size={40}
                  className="text-red-600"
                  strokeWidth={2.5}
                />
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-textPrimary">
            {status === "loading" && "Đang xác thực email..."}
            {status === "success" && "Xác thực thành công!"}
            {status === "error" && "Xác thực thất bại"}
          </h2>

          <p className="mt-4 text-sm text-textSecondary">{message}</p>

          {status === "success" && (
            <p className="mt-2 text-sm text-textSecondary">
              Bạn sẽ được chuyển đến trang đăng nhập trong giây lát...
            </p>
          )}
        </div>

        <div className="space-y-4">
          {status === "success" && (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            >
              Đăng nhập ngay
            </button>
          )}

          {status === "error" && (
            <>
              <button
                onClick={handleResendVerification}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                <Mail className="mr-2 h-4 w-4" />
                Gửi lại email xác thực
              </button>

              <button
                onClick={() => navigate("/login")}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-textPrimary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                Về trang đăng nhập
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
