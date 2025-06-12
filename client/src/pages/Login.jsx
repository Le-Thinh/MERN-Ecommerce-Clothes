import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { login } from "../api/user.api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [atk, setATK] = useState(localStorage.getItem("atk"));
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
      console.log("response", response);

      // const { accessToken, refreshToken } = response.data.metadata.tokens;

      const { accessToken } = response.data.metadata.tokens;

      const clientId = response.data.metadata.metadata._id;
      if (response) {
        localStorage.setItem("authorization", accessToken);
        localStorage.setItem("x-client-id", clientId);

        toast.success("Hello!!");
        navigate("/");
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

  useEffect(() => {
    let accessToken = localStorage.getItem("authorization");

    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-around w-full">
      <Link to="/">
        <div className="w-[500px] object-contain">
          <img src={assets.chillnfreelogo} alt="" />
        </div>
      </Link>
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
            <Link className="text-[#ea1b25] underline" to="/dang-ky-tai-khoan">
              Đăng ký
            </Link>
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
              <Link to="/">
                <img src={assets.logofacebook} alt="facebook" />
              </Link>
            </div>
            <div className="h-10 w-10">
              <Link to="/">
                <img src={assets.logogoogle} alt="google" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
