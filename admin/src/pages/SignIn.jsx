import React, { useEffect, useState } from "react";
import PageMeta from "../components/common/PageMeta";
import Input from "../components/form/input/InputField";
import Label from "../components/form/Label";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../api/user.api";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <div className="text-2xl font-bold">Login Admin</div>
      <div>
        <form
          onSubmit={handleLogin}
          action=""
          className="space-y-6 w-[400px] p-16 border-2 rounded-xl shadow-sm"
        >
          <div className="">
            <Label>Email</Label>
            <Input
              className="w-full px-3 py-2"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exam@gmail.com"
              type="email"
              required={true}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              required={true}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
              type="password"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-blue-600 text-white text-theme-sm rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
