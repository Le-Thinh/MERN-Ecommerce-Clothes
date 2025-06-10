import React, { useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { signUp } from "../api/user.api";
const Register = () => {
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Vui lòng nhập email hợp lệ");
      return;
    }

    try {
      const response = await signUp(email);

      if (response.data.message) {
        toast.success("Sent email verify");
      } else {
        toast.error("Invalid Email");
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
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-around w-full">
      <a href="/">
        <div className="w-[500px] object-contain">
          <img src={assets.chillnfreelogo} alt="" />
        </div>
      </a>
      <div className=" bg-white w-[500px] rounded-2xl p-10 flex flex-col">
        <h1 className="text-[#ea1b25] text-4xl font-bold flex items-center gap-2">
          Đăng ký <img className="w-10 h-10" src={assets.logobird} alt="" />
        </h1>
        <div className="mt-5 flex flex-col">
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <input
                placeholder="Vui lòng nhập email đăng ký"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-2 py-2.5 rounded border border-[#eadbdb]"
                type="email"
                id="email"
              />
            </div>

            <button
              className=" w-[250px] p-3.5 text-center text-white bg-[#ea1b25] rounded-2xl cursor-pointer font-bold "
              type="submit"
            >
              Đăng ký
            </button>
          </form>
        </div>

        <div className="flex mt-5">
          <span className="text-sm font-normal">
            Bạn đã có tài khoản?{" "}
            <a className="text-[#ea1b25] underline" href="/dang-nhap">
              Đăng nhập
            </a>
          </span>
        </div>

        <div className="flex flex-col mt-10 gap-3">
          <div className="flex w-full items-center justify-center">
            <div className="w-full h-[1px] bg-[#dbdbdb]"></div>
            <span className="text-gray-400 text-xs uppercase px-3">hoặc</span>
            <div className="w-full h-[1px] bg-[#dbdbdb]"></div>
          </div>
          <div className="flex justify-around items-center">
            <div className="h-10 w-10">
              <a href="/">
                <img src={assets.logofacebook} alt="facebook" />
              </a>
            </div>
            <div className="h-10 w-10">
              <a href="/">
                <img src={assets.logogoogle} alt="google" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
