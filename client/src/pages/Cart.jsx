import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table,
} from "../components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import locationData from "../assets/location";
import { useShopContext } from "../contexts";
import { toast } from "react-toastify";
import {
  deleteProductFromCart,
  getListUserCart,
  updateQuantityCart,
} from "../api/cart.api";

import Swal from "sweetalert2";
import { orderByUser } from "../api/order.api";

const Cart = () => {
  const { cart, setCart, discountCode, setDiscountCode } = useShopContext();
  const [cartId, setCartId] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [location, setLocation] = useState("");
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phone, setPhone] = useState("");

  const provinces = locationData.map((p) => ({
    code: p.province_code,
    name: p.name,
  }));

  const wards = selectedProvince
    ? locationData.find((p) => p.province_code === selectedProvince)?.wards ||
      []
    : [];

  const navigate = useNavigate();

  const fetchListCart = async () => {
    const clientId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!clientId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    try {
      const res = await getListUserCart(clientId, accessToken);

      if (res.data) {
        setCart(res.data.metadata?.cart_products || []);
        setCartId(res.data.metadata?._id || "");
        console.log(cart);
      } else {
        toast.error("Fetch Data Failure");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Fetch Data Cart");
    }
  };

  const handleUpdateQuantity = async (skuId, quantity) => {
    const clientId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!clientId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    try {
      const res = await updateQuantityCart(
        clientId,
        accessToken,
        skuId,
        quantity
      );
      if (res.data) {
        fetchListCart?.();
      } else {
        toast.error("Update Quantity Failure");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid update quantity Cart");
    }
  };

  const handleDeleteProductCart = async (skuId) => {
    const clientId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!clientId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    const result = await Swal.fire({
      title: "Xác nhận xoá?",
      text: "Bạn có chắc chắn muốn xoá sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Huỷ",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteProductFromCart(clientId, accessToken, skuId);
      if (res.data) {
        fetchListCart?.();
      } else {
        toast.error("Delete Product From Cart Failure");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Delete Product From Cart");
    }
  };

  const handleCheckout = async (cartId) => {
    const clientId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!clientId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    const checkoutAddress = {
      phone: phone,
      province: selectedProvince,
      ward: selectedWard,
      location: location,
    };

    if (!selectedProvince || !selectedWard || !location || !phone) {
      toast.warning("Vui lòng nhập đầy đủ địa chỉ giao hàng!");
      return;
    }

    try {
      const res = await orderByUser(
        cartId,
        clientId,
        accessToken,
        checkoutAddress,
        "COD"
      );
      if (res.data) {
        fetchListCart?.();
        toast.success("Đặt hàng thành công");
        setIsAddressVisible(false);
      } else {
        toast.error("Lỗi đặt hàng");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Checkout From Cart");
    }
  };

  const handleTotalPrice = async (cart) => {
    const total = cart.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    return setTotalPrice(total);
  };

  useEffect(() => {
    const userId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");
    if (!userId || !accessToken) {
      navigate("/dang-nhap");
    }

    fetchListCart();
  }, []);

  useEffect(() => {
    handleTotalPrice(cart);
  }, [cart]);

  return (
    <div className="w-full mt-[130px]">
      <h1 className="text-[#ea1b25] text-[30px] barlow5 ml-10">Giỏ hàng</h1>

      <div className="w-[90%] mx-auto flex flex-wrap gap-6 mt-6">
        {/* Left Column - Table + Address */}
        <div className="w-[66%]">
          {/* Table */}
          <div className="bg-white rounded-xl shadow p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader className="text-start text-sm barlow3">
                    Sản phẩm
                  </TableCell>
                  <TableCell isHeader className="text-start text-sm barlow3">
                    Đơn giá
                  </TableCell>
                  <TableCell isHeader className="text-start text-sm barlow3">
                    Số lượng
                  </TableCell>
                  <TableCell isHeader className="text-start text-sm barlow3">
                    Tổng tiền
                  </TableCell>
                  <TableCell
                    isHeader
                    className="text-start text-sm barlow3"
                  ></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Dữ liệu sản phẩm sẽ thêm tại đây */}
                {cart.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-gray-200 w-full"
                  >
                    <TableCell
                      colSpan={4}
                      className="text-center py-4 barlow3 flex items-center gap-2 p-0"
                    >
                      <img
                        className="object-cover w-[50px]"
                        src={item.thumb}
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="barlow3 text-xs text-[#1D2630]">
                          {item.name}
                        </span>
                        {item.option ? (
                          <span className="barlow3 text-xs text-start text-[#39475F]">
                            Size:{item.option}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-[#1D2630] barlow3 text-xs">
                        {item.price?.toLocaleString("vi-VN")} VNĐ
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex w-fit items-center border border-gray-300 rounded-lg overflow-hidden text-[#333]">
                        <button
                          onClick={() => handleUpdateQuantity(item.sku_id, -1)}
                          className="w-10 h-8 flex justify-center items-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                        >
                          <span className="text-sm barlow3">−</span>
                        </button>

                        <div className="w-10 h-8 flex justify-center items-center border-l border-r border-gray-300 bg-white text-xs barlow3 font-medium select-none">
                          {item.quantity}
                        </div>

                        <button
                          onClick={() => handleUpdateQuantity(item.sku_id, 1)}
                          className="w-10 h-8 cursor-pointer flex justify-center items-center bg-white hover:bg-gray-100 transition"
                        >
                          <span className="text-sm barlow3">+</span>
                        </button>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-[#1D2630] barlow3 text-xs">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}{" "}
                        VNĐ
                      </span>
                    </TableCell>

                    <TableCell>
                      <button
                        onClick={() => handleDeleteProductCart(item.sku_id)}
                        className="text-[#1D2630] barlow3 cursor-pointer  rounded px-2 py-2 flex justify-center hover:bg-red-200/50 hover:fill-red-500 duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                          className=" "
                        >
                          <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Địa chỉ */}
          <div className="bg-white mt-5 p-5 rounded-xl shadow">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium barlow3">Địa chỉ</p>
              <button
                onClick={() => setIsAddressVisible(true)}
                className="bg-[#00AEEF] text-white px-4 py-2 rounded hover:bg-[#0099cc] transition cursor-pointer barlow2"
              >
                Thêm địa chỉ mới
              </button>
            </div>

            {isAddressVisible && (
              <div className="mt-12 ml-10 flex flex-col gap-6">
                <span className="barlow3 text-sm text-[#1D2630]">
                  Thêm địa chỉ
                </span>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center w-full gap-x-2">
                    <label className="w-[30%] barlow3 text-sm">
                      Số điện thoại:
                    </label>
                    <div className="flex-[0_0_auto] w-[66%]">
                      <input
                        className="barlow3 rounded-lg border border-[#6b7280] px-3 py-2 w-full"
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap items-start gap-x-2 w-full">
                    <label className="w-[30%] barlow3 text-sm pt-3">
                      Địa chỉ:
                    </label>
                    <div className="flex flex-col w-[35%] gap-2 barlow3">
                      {/* Province */}
                      <div className="relative w-full">
                        <select
                          className="px-4 py-3 border rounded barlow3 text-[#5B6B79] appearance-none w-full"
                          value={selectedProvince}
                          onChange={(e) => {
                            setSelectedProvince(e.target.value);
                            setSelectedWard("");
                          }}
                        >
                          <option value="">Tỉnh/Thành phố</option>
                          {provinces.map((prov) => (
                            <option key={prov.code} value={prov.code}>
                              {prov.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* District */}

                      {/* Ward */}
                      <div className="relative w-full">
                        <select
                          className="w-full px-4 py-3 barlow3 border rounded barlow3 text-[#5B6B79] appearance-none"
                          value={selectedWard}
                          onChange={(e) => setSelectedWard(e.target.value)}
                          disabled={!selectedProvince}
                        >
                          <option value="">Phường/Xã</option>
                          {wards.map((ward) => (
                            <option key={ward.ward_code} value={ward.ward_code}>
                              {ward.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 flex flex-wrap space-x-2">
                    <label className="w-[30%] barlow3 text-sm pt-3">
                      Số nhà/Ngõ/Đường/Phố:
                    </label>
                    <div className="flex-[0_0_auto] w-[66%]">
                      <input
                        className="rounded-lg border border-[#6b7280] px-3 py-2 w-full"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-end mt-4 space-x-5">
                    <button
                      onClick={() => setIsAddressVisible(false)}
                      className="hover:bg-[#39465F] rounded-lg px-4 py-2 hover:text-white border barlow3 cursor-pointer text-sm"
                    >
                      Hủy
                    </button>
                    <button className="hover:bg-[#0387c4] bg-[#04A9F5] rounded-lg px-4 py-2 text-white barlow3 cursor-pointer text-sm">
                      Lưu và lựa chọn địa chỉ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-end mt-5 ">
            <Link
              to={"/"}
              className="text-sm text-[#04A9F5] barlow3 hover:bg-blue-400/30 px-4 py-3 rounded duration-200"
            >
              ← Trở về trang chủ
            </Link>
          </div>
        </div>

        {/* Right Column - Mã giảm giá + Thanh toán */}
        <div className="w-[30%]">
          {/* Mã giảm giá */}
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-sm font-medium mb-3">Bạn có mã giảm giá?</p>
            <div className="flex border border-gray-500 rounded-xl overflow-hidden ">
              <input
                type="text"
                placeholder="Mã giảm giá"
                className="flex-1 px-3 py-2 outline-none barlow2"
                onChange={(e) => setDiscountCode(e.target.value)}
                value={discountCode}
              />
              <button className="bg-[#f5f5f5] text-[#333] px-4 py-2 font-medium cursor-pointer hover:text-white hover:bg-[#39465F] duration-200">
                Áp dụng
              </button>
            </div>
          </div>

          {/* Tổng tiền + Thanh toán */}
          <div className="bg-white rounded shadow p-5">
            <div className="flex justify-between mb-4 text-lg font-semibold">
              <span className="barlow3">Tổng tiền</span>
              <span className="barlow2">
                {totalPrice?.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
            <button
              onClick={() => {
                handleCheckout(cartId);
              }}
              className="w-full bg-[#ea1b25] text-white py-3 rounded-full text-lg font-bold hover:bg-red-600 transition barlow2 cursor-pointer"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
