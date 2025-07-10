import React, { useState } from "react";

const UpdateCategory = ({ category, onCancel, onSubmit }) => {
  const [catId, setCatId] = useState(category ? category.cat_id : "#####");
  const [name, setName] = useState(category ? category.cat_name : "undefined");
  const [parentId, setParentId] = useState(
    category ? (category.cat_parent === null ? "" : category.cat_parent) : ""
  );
  const [catImage, setCatImage] = useState(
    category ? category.cat_image : "Image"
  );
  const [description, setDescription] = useState(
    category ? category.cat_description : "description"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    onSubmit({ id: category?.id, name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex w-full justify-between">
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Id</label>
          <input
            disabled
            className="w-full border p-2 rounded bg-gray-200"
            value={catId}
            onChange={(e) => setCatId(e.target.value)}
          />
        </div>
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Name</label>
          <input
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full px-3">
        <label className="block font-semibold mb-1">Category Description</label>
        <input
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Parent Id</label>
          <div className="relative w-full flex items-center">
            <input
              className="w-full border p-2 rounded"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
            <span className="absolute right-3 transform top-[60%] items-center -translate-y-1/2 text-gray-500 cursor-pointer">
              <span className="material-symbols-outlined">category</span>
            </span>
          </div>
        </div>
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Image</label>

          <input
            className="w-full border p-2 rounded"
            value={catImage}
            onChange={(e) => setCatImage(e.target.value)}
          />
        </div>
      </div>
      <div className="space-x-2 ml-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {category ? "Cập nhật" : "Thêm mới"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 rounded"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default UpdateCategory;
