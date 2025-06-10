import React, { useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { login } from "../api/user.api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Vui lòng nhập email");
      return;
    }

    if (!password) {
      toast.warn("Vui lòng nhập password");
      return;
    }

    try {
      const response = await login(email, password);

      const { accessToken, refreshToken } = response.data.tokens;
      const clientId = response.metadata._id;

      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("clientId", clientId);

      toast.success("Đăng nhập thành công");

      navigate("/");

      return;
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
      <div className="h-[600px] bg-white w-[500px] rounded-2xl p-10 flex flex-col">
        <h1 className="text-[#ea1b25] text-4xl font-bold flex items-center gap-2">
          Đăng nhập <img className="w-10 h-10" src={assets.logobird} alt="" />
        </h1>
        <div className="mt-5 flex flex-col">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-light text-sm">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-2.5 rounded border border-[#eadbdb]"
                type="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-light text-sm">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-2 py-2.5 rounded border border-[#eadbdb]"
                type="password"
                id="password"
              />
            </div>
            <div className="flex gap-2">
              <input
                className="h-5 w-5"
                type="checkbox"
                name=""
                id="remember_me"
              />
              <label htmlFor="remember_me" className="cursor-pointer">
                Ghi nhớ
              </label>
            </div>

            <button
              href="/"
              className=" w-[250px] p-3.5 text-center text-white bg-[#ea1b25] rounded-2xl cursor-pointer font-bold "
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
        </div>

        <div className="flex mt-5">
          <span className="text-sm font-normal">
            Bạn chưa có tài khoản?{" "}
            <a className="text-[#ea1b25] underline" href="/dang-ky-tai-khoan">
              Đăng ký
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

export default Login;
