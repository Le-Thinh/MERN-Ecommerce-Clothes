import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { sendMailResetPassword } from "../api/user.api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [openMailSuccess, setOpenMailSuccess] = useState(false);

  const handleSendMailRePass = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Vui lòng nhập email");
      return;
    }

    try {
      const response = await sendMailResetPassword(email);
      if (response) {
        setOpenMailSuccess(true);
        toast.success("Đã gửi mail lấy lại password");
        return;
      } else {
        toast.error("Something wrongs!!");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex flex-col items-center w-full pt-10 gap-10">
      <Link to="/">
        <div className="w-[250px] object-contain">
          <img src={assets.chillnfreelogo} alt="" />
        </div>
      </Link>
      <div className="h-[300px] bg-white w-[500px] rounded-2xl p-10 flex flex-col items-center ">
        <h2 className="text-[#ea1b25] barlow3 text-xl">Thay đổi mật khẩu</h2>
        {!openMailSuccess ? (
          <div className="mt-5 flex flex-col gap-3">
            <form
              onSubmit={handleSendMailRePass}
              action=""
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="font-light text-sm barlow2">
                  Email
                </label>
                <div className="flex gap-2">
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[80%] px-2 py-2.5 rounded border border-[#eadbdb]"
                    placeholder="exam@gmail.com"
                    type="email"
                    id="email"
                  />{" "}
                  <button className="w-[150px] px-2 py-2 text-center text-white bg-[#ea1b25] text-sm rounded-sm cursor-pointer font-bold">
                    Send Mail
                  </button>
                </div>
              </div>
            </form>
            <h3 className="barlow3 text-red-600">
              Nhập email cần lấy lại mật khẩu!
            </h3>
          </div>
        ) : (
          <div>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <span className="barlow3 text-xl text-green-700 items-center justify-center">
              Đã gửi mail nhằm lấy lại mật khẩu, vui lòng kiểm tra gmail của bạn
              và kiểm tra cả trong thư mục rác của email
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
