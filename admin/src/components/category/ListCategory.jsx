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
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
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
              Cat ID
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
              <TableRow
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-white/5 border-b dark:border-white/10"
              >
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 dark:text-white/90 text-theme-sm">
                    {index + 1}
                  </span>
                </TableCell>

                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 dark:text-white/90 text-theme-sm">
                    {cat.cat_id}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-2 flex justify-center">
                  <img
                    src={cat.cat_image}
                    alt="cat"
                    className="w-12 h-12 object-cover rounded"
                  />
                </TableCell>

                <TableCell className="px-4 py-2 text-center w-[100px]">
                  <span className="block font-medium text-gray-800 dark:text-white/90 text-theme-sm">
                    {cat.cat_name}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-2 text-start w-[250px]">
                  <span className="block font-medium text-gray-800 dark:text-white/90 text-theme-sm line-clamp-2">
                    {cat.cat_description}
                  </span>
                </TableCell>

                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 dark:text-white/90 text-theme-sm">
                    {cat.cat_parent || "-"}
                  </span>
                </TableCell>

                <TableCell className="flex flex-wrap gap-2 px-5 py-4 sm:px-6 text-center">
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
                    Update
                  </button>

                  <button
                    onClick={() => handleUnpublishCat(cat._id)}
                    className={`px-3 py-1 text-white rounded transition ${
                      cat.isDraft
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    Draft
                  </button>

                  <button
                    onClick={() => handlePublishCat(cat._id)}
                    className={`px-3 py-1 text-white rounded transition ${
                      cat.isPublished
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-500 hover:bg-gray-600"
                    }`}
                  >
                    Publish
                  </button>

                  <button
                    onClick={() => handleDeleteCat(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
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
