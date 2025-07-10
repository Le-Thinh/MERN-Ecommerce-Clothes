import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table";
import { useShopContext } from "../../contexts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getListAllOrderByUser } from "../../api/order.api";
import { getStatusStyle } from "../ui/order_status";

const PurchaseHistory = () => {
  const { allOrders, setAllOrders } = useShopContext();
  const navigate = useNavigate();

  const fetchDataOrders = async () => {
    const userId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!userId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    const res = await getListAllOrderByUser(userId, accessToken);

    if (res.data) {
      setAllOrders(res.data.metadata || []);
    }
  };

  useEffect(() => {
    fetchDataOrders();
  }, []);
  return (
    <div className="mt-[130px]">
      <h2 className="text-xl font-bold mb-4 barlow3 text-[#ea1b25] text-center">
        Lịch sử mua hàng
      </h2>

      <div className="px-5">
        <Table className="border border-gray-200">
          <TableHeader className="bg-gray-100 text-left">
            <TableRow>
              <TableCell isHeader className="p-2 barlow3">
                Mã đơn hàng
              </TableCell>
              <TableCell isHeader className="p-2 barlow3">
                Ngày tạo
              </TableCell>
              <TableCell isHeader className="p-2 barlow3">
                Tổng tiền
              </TableCell>
              <TableCell isHeader className="p-2 barlow3">
                Trạng thái
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allOrders.map((order) => (
              <TableRow key={order.id} className="border-t hover:bg-gray-50">
                <TableCell className="p-2 barlow3">{order.id}</TableCell>
                <TableCell className="p-2 barlow3">
                  {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell className="p-2 barlow3">
                  {order.order_checkout.totalPrice.toLocaleString("vi-VN")} ₫
                </TableCell>
                <TableCell
                  className={`p-2 barlow3 ${getStatusStyle(
                    order.order_status
                  )}`}
                >
                  {order.order_status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseHistory;
