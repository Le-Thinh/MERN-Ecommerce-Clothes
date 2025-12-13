"use strict";

export const randomId = () => {
  return Math.floor(Math.random() * 899999 + 100000);
};

export const isAuthenticated = () => {
  const adminId = localStorage.getItem("x-client-id");
  const accessToken = localStorage.getItem("authorization");
  return adminId && accessToken;
};
