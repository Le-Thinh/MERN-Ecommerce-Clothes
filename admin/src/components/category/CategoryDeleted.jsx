import React, { useEffect } from "react";
import {
  activeCatCategory,
  getAllCategoryDeleted,
} from "../../api/category.api";
import { toast } from "react-toastify";
import { useShopContext } from "../../contexts";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "../ui/table/index";
import Swal from "sweetalert2";
const CategoryDeleted = () => {
  const { categories, setCategory } = useShopContext();

  // FETCH DATA CATEGORY DELETED
  const fetchCategoriesDeleted = async () => {
    try {
      const res = await getAllCategoryDeleted();
      const categoriesFromAPI = res?.data?.metadata || [];
      setCategory(categoriesFromAPI);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Request Category");
    }
  };

  // ACTIVE CATEGORY
  const activeCategory = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận active danh mục?",
      text: "Bạn có chắc chắn muốn active danh mục này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Huỷ",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await activeCatCategory(id);

      if (res) {
        toast.success("Active Category Successfully");
        await fetchCategoriesDeleted?.();
      } else {
        toast.error("Delete Category Failure!!");
        return res;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    }
  };

  useEffect(() => {
    fetchCategoriesDeleted();
  }, [setCategory]);
  return (
    <div className="overflow-x-auto">
      <Table className="dark:border-white/20">
        <TableHeader className="bg-gray-100 dark:bg-white/[0.03]">
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
              <TableRow
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-300 dark:border-white/20"
              >
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {index + 1}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_id}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2 flex justify-center">
                  <img
                    className="w-10 object-contain"
                    src={cat.cat_image}
                    alt=""
                  />
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start w-[100px]">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_name}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start w-[280px]">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_description}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {cat.cat_parent}
                  </span>
                </TableCell>
                <TableCell className="space-x-2 text-center">
                  <button
                    onClick={() => activeCategory(cat._id)}
                    className={`px-3 py-1  text-white rounded bg-gray-500 hover:bg-blue-600 transition-all duration-200`}
                  >
                    Active
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

export default CategoryDeleted;
