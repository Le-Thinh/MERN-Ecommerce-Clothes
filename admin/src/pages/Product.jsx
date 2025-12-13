import React from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import ComponentCard from "../components/common/ComponentCard";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useLoadingContext, useShopContext } from "../contexts";
import { toast } from "react-toastify";
import { getAllSpus } from "../api/product.api";
import { useEffect } from "react";
import { useState } from "react";

const Product = () => {
  const { spus, setSpus } = useShopContext();
  const { setLoading } = useLoadingContext();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchSpu = async (page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const res = await getAllSpus({ limit, skip });
      if (res) {
        const dataSpu = res.data?.metadata.spus || [];
        const total = res.data?.metadata.totalPages || 1;
        setTotalPages(total);
        setSpus(dataSpu);
        console.log("Fetching dât:", dataSpu);
        return;
      } else {
        toast.error("Fetch Data Attribute Failure");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    fetchSpu(page);
  }, [page]);

  return (
    <>
      <PageMeta title="Product" description="Products" />

      <PageBreadcrumb pageTitle={"Products"} />

      <ComponentCard title={"List Products"}>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <Link
                to={"new-spu"}
                className="bg-blue-400 px-3 py-2 rounded text-white hover:bg-blue-600 transition-all duration-500"
              >
                New Product +
              </Link>
            </div>
          </div>
          {/* HEADER */}
          <div className="max-w-full overflow-x-auto mt-5">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    #
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    id
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Description
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Category
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Thumb
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Price Default
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Variations
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* BODY */}
              <TableBody
                className={"divide-y divide-gray-100 dark:divide-white/[0.05]"}
              >
                {Array.isArray(spus) &&
                  spus.map((spu, index) => (
                    <TableRow
                      onClick={() => navigate(`detail/${spu._id}`)}
                      className={`hover:bg-gray-200/95 dark:hover:bg-[#7592ff]/20 duration-200 cursor-pointer ${
                        spu.isDraft ? "bg-red-300" : null
                      }`}
                      key={index}
                    >
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {index + 1}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {spu.product_id}
                        </span>
                      </TableCell>

                      <TableCell className="w-[200px] px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {spu.product_name}
                        </span>
                      </TableCell>

                      <TableCell className="w-[300px] px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {spu.product_description}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {spu.cat_name[0]}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start flex justify-center items-center gap-2">
                        <span className="w-[40px] h-[40px] rounded-full object-center overflow-hidden text-theme-sm dark:text-white/90">
                          {spu.product_thumb[0] ? (
                            <img src={spu.product_thumb[0]} alt="thumb" />
                          ) : (
                            <div className="w-[40px] h-[40px] bg-gray-200 rounded" />
                          )}
                        </span>
                        <span className="font-medium text-red-600/70 text-theme-sm dark:text-white/90">
                          +{spu.product_thumb.length - 1}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {spu.product_price.toLocaleString("vi-VN")}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start ">
                        <div className="flex items-center gap-2 group">
                          <span className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {spu.product_variations[0]?.name}
                          </span>
                          {spu.product_variations.length > 1 && (
                            <span className="font-medium text-red-600/70 text-theme-sm dark:text-white/90">
                              +{spu.product_variations.length - 1}
                            </span>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          {/* PAGINATION */}
          <div className="flex justify-center mt-5 gap-4 items-center">
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Trang trước
            </button>
            <span className="text-gray-700 dark:text-white/90">
              Trang {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={page === totalPages}
            >
              Trang sau
            </button>
          </div>
        </div>
      </ComponentCard>
    </>
  );
};

export default Product;
