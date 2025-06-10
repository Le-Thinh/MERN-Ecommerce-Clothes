import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../api/user.api";
import { toast } from "react-toastify";
const EmailVerified = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        console.log(res.data); // Xem metadata nếu cần
        setStatus("success");
        toast.success("Verify Success");
      } catch (err) {
        toast.error("Verify Error");
        console.error(err);
        setStatus("error");
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        {status === "loading" && <p>Đang xác minh email...</p>}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Email xác minh thành công!
            </h1>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã xác minh email. Bây giờ bạn có thể đăng nhập và sử
              dụng dịch vụ của chúng tôi.
            </p>
            <a
              href="/dang-nhap"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              Đăng nhập ngay
            </a>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Xác minh thất bại!
            </h1>
            <p className="text-gray-600 mb-6">
              Token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerified;
