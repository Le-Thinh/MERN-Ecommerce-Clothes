import React, { useEffect, useState } from "react";
import ListCategory from "../components/category/ListCategory";
import UpdateCategory from "../components/category/UpdateCategory";
import { useShopContext } from "../contexts";
import { getAllCategory } from "../api/category.api";
import { toast } from "react-toastify";
import CreateCategory from "../components/category/CreateCategory";
import { Link } from "react-router-dom";

const Category = () => {
  const { categories, setCategory } = useShopContext();
  const [editingCategory, setEditingCategory] = useState(null);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      const categoriesFromAPI = res?.data?.metadata || [];
      setCategory(categoriesFromAPI);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Request Category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [setCategory]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowFormUpdate(true);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa không?");
    if (confirm) {
      setCategory((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  const handleFormSubmit = (category) => {
    if (category.id) {
      // Update
      setCategory((prev) =>
        prev.map((item) => (item.id === category.id ? category : item))
      );
    } else {
      // Add
      const newCategory = {
        ...category,
        id: Date.now(),
      };
      setCategory((prev) => [...prev, newCategory]);
    }
    setShowFormUpdate(false);
  };

  return (
    <div className="p-4 bg-white border-1 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">List Category</h2>

      {!showFormUpdate && (
        <>
          <div className="flex items-center justify-between mb-5">
            <div></div>
            <div>
              <Link
                to="/new-category"
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded relative right-0"
              >
                + New
              </Link>
            </div>
          </div>

          <ListCategory
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onRefresh={fetchCategories}
          />
        </>
      )}

      {showFormUpdate && (
        <UpdateCategory
          category={editingCategory}
          onCancel={() => setShowFormUpdate(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {showFormCreate && <CreateCategory />}
    </div>
  );
};

export default Category;
