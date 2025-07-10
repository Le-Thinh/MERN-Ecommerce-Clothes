import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table/index";
import {
  isDeletedCategory,
  isPublishedCategory,
  unpublishCatCategory,
} from "../../api/category.api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ListCategory = ({ categories, onRefresh }) => {
  const handlePublishCat = async (id) => {
    try {
      const res = await isPublishedCategory(id);

      if (res) {
        if (res.data.metadata.status === "publish") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Publish Category Successfully");
          onRefresh?.();
        }
      } else {
        toast.error("Publish Category Failure!!");
        return res;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Publish Cat");
    }
  };

  const handleUnpublishCat = async (id) => {
    try {
      const res = await unpublishCatCategory(id);

      if (res) {
        if (res.data.metadata.status === "draft") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("UnPublish Category Successfully");
          onRefresh?.();
        }
      } else {
        toast.error("Un Publish Category Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid UnPublish Category");
    }
  };

  const handleDeleteCat = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xoá?",
      text: "Bạn có chắc chắn muốn xoá danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Huỷ",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await isDeletedCategory(id);

      if (res) {
        toast.success("Delete Category Successfully");
        onRefresh?.();
      } else {
        toast.error("Delete Category Failure!!");
        return res;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="">
        <TableHeader className="bg-gray-100">
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
              Cat id
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Image
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
              Parent
            </TableCell>
            <TableCell
              isHeader
              className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className=" px-5 py-4 sm:px-6 text-start ">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {index + 1}
                  </span>
                </TableCell>
                <TableCell className=" px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_id}
                  </span>
                </TableCell>
                <TableCell className="  px-4 py-2 flex justify-center">
                  <img
                    className="w-10 object-contain"
                    src={cat.cat_image}
                    alt=""
                  />
                </TableCell>
                <TableCell className=" px-4 py-2 text-center w-[100px]">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_name}
                  </span>
                </TableCell>
                <TableCell className=" px-4 py-2 text-center w-[280px]">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_description}
                  </span>
                </TableCell>
                <TableCell className=" px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_parent}
                  </span>
                </TableCell>
                <TableCell className=" space-x-2 text-center">
                  <button
                    // onClick={() => onEdit(cat)}
                    className="px-3 py-1 bg-yellow-400 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleUnpublishCat(cat._id)}
                    className={`px-3 py-1  text-white rounded ${
                      cat.isDraft ? "bg-blue-600" : "bg-gray-500"
                    }`}
                  >
                    isDraft
                  </button>
                  <button
                    onClick={() => handlePublishCat(cat._id)}
                    className={`px-3 py-1  text-white rounded ${
                      cat.isPublished ? "bg-blue-600" : "bg-gray-500"
                    }`}
                  >
                    isPublished
                  </button>
                  <button
                    onClick={() => handleDeleteCat(cat._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center py-4 text-gray-500" colSpan={3}>
                Không có danh mục nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListCategory;
