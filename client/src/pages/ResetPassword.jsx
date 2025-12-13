import React from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "../api/user.api";

const ResetPassword = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      toast.warning("Nhập mật khẩu mới");
      return;
    }

    if (!confirmNewPassword) {
      toast.warning("Nhập xác nhận mật khẩu");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.warning("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await updatePassword(token, newPassword);
      if (response) {
        navigate("/dang-nhap");
        toast.success("Cập nhật mật khẩu thành công");
      } else {
        toast.error("Something wrong!!");
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
    <div className="min-h-screen bg-[#e5e7eb] flex flex-col items-center w-full gap-10">
      <Link to="/">
        <div className="w-[250px] object-contain">
          <img src={assets.chillnfreelogo} alt="" />
        </div>
      </Link>
      <div className="h-[360px] bg-white w-xl rounded-2xl p-10 flex flex-col gap-5 items-center ">
        <h2 className="text-[#ea1b25] barlow3 text-xl font-semibold">
          Nhập mật khẩu mới
        </h2>

        <div className="flex flex-col gap-3">
          <form
            onSubmit={handleUpdatePassword}
            action=""
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="font-light text-sm barlow2">
                  New Password
                </label>
                <div className="flex flex-col">
                  <input
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-[80%] px-2 py-2.5 rounded border border-[#eadbdb]"
                    type="password"
                    id="newPassword"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="font-light text-sm barlow2">
                  Confirm Password
                </label>
                <div className="flex flex-col">
                  <input
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-[80%] px-2 py-2.5 rounded border border-[#eadbdb]"
                    type="password"
                    id="newPassword"
                  />
                </div>
              </div>
              <button className="w-[150px] px-2 py-2 text-center text-white bg-[#ea1b25] text-sm rounded-sm cursor-pointer font-bold">
                Đổi mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
