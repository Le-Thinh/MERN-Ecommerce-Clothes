import React, { useEffect, useState } from "react";
import ListCategory from "../components/category/ListCategory";
import UpdateCategory from "../components/category/UpdateCategory";
import { useLoadingContext, useShopContext } from "../contexts";
import { getAllCategory } from "../api/category.api";
import { toast } from "react-toastify";
import CreateCategory from "../components/category/CreateCategory";
import { Link } from "react-router-dom";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import ComponentCard from "../components/common/ComponentCard";

const Category = () => {
  const { categories, setCategory } = useShopContext();
  const [editingCategory, setEditingCategory] = useState(null);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormCreate, setShowFormCreate] = useState(false);
  const { setLoading } = useLoadingContext();
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategory();
      const categoriesFromAPI = res?.data?.metadata || [];
      setCategory(categoriesFromAPI);
      console.log("categories::::", categoriesFromAPI);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Request Category");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <PageMeta title="Categories" description="Manage categories" />
      <PageBreadcrumb pageTitle="Categories" />

      <ComponentCard title="Categories">
        {!showFormUpdate ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <div></div>
              <Link
                to="/new-category"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
              >
                + New Category
              </Link>
            </div>

            {/* List */}
            <ListCategory
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRefresh={fetchCategories}
            />
          </>
        ) : (
          <UpdateCategory
            category={editingCategory}
            onCancel={() => setShowFormUpdate(false)}
            onSubmit={() => setShowFormUpdate(false)}
          />
        )}
      </ComponentCard>
    </>
  );
};

export default Category;
