import React from "react";
import { useShopContext } from "../contexts";
import { getDataUser } from "../api/user.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Input from "../components/ui/input/InputField";

const InfoAccount = () => {
  const { user, setUser } = useShopContext();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("x-client-id");
      const accessToken = localStorage.getItem("authorization");

      if (!userId || !accessToken) return;

      const res = await getDataUser(userId, accessToken);

      if (res) {
        const usrData = res?.data.metadata?.metadata;
        setUser(usrData);
      } else {
        toast.error(res.message);
        navigate("/dang-nhap");
      }
    } catch (err) {
      console.error("Lỗi lấy user:", err);
      navigate("/dang-nhap");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="mt-[138px]">
      <div className="barlow1 text-2xl text-[#ea1b25] ml-5">
        Thông tin cá nhân
      </div>
      <div className="grid grid-cols-2 p-5 gap-3">
        <div className="flex flex-col gap-3 border border-gray-500 px-3 py-2 rounded">
          <div className="flex flex-col">
            <label className="barlow3 text-sm text-[#1D2630]">
              Ảnh đại diện:
            </label>
            <div className="m-5 relative w-35 h-35 cursor-pointer">
              <img
                className="w-full h-full object-cover rounded-full border border-gray-300"
                src={user.usr_avatar || "/avatar.svg"}
                alt="avatar"
              />
              <button
                // onClick={() => fileInputRef.current.click()}
                type="button"
                className="absolute cursor-pointer inset-0 bg-black/50 text-white text-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                Edit Avatar
              </button>
              <input
                type="file"
                accept="image/*"
                // ref={"fileInputRef"}
                className="hidden"
                // onChange={"handleFileChange"}
              />
            </div>
          </div>
          <div className="w-full flex-col gap-2">
            <label className="barlow3 text-sm">Email:</label>
            <div className="relative">
              <Input
                value={user.usr_email}
                disabled
                type="email"
                className="barlow3 relative"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label className="barlow3 text-sm">Họ và tên:</label>
            <span className="text-sm barlow3">{user.usr_name}</span>
          </div>
          <div className="flex gap-2">
            <label className="barlow3 text-sm">Name:</label>
            <span className="text-sm barlow3">{user.usr_name}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 border border-gray-500 px-3 py-2 rounded"></div>
      </div>
    </div>
  );
};

export default InfoAccount;
