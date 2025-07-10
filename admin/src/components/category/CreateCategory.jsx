import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { image } from "../../assets";
import { uploadImage } from "../../api/upload.api";
import { createCategory, getAllCategory } from "../../api/category.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../../contexts";

const CreateCategory = () => {
  const { categories, setCategory } = useShopContext();

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      const categoriesFromAPI = res?.data?.metadata || [];
      console.log(categoriesFromAPI);
      setCategory(categoriesFromAPI);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Request Category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [setCategory]);

  const [nameCat, setNameCat] = useState("");
  const [descriptionCat, setDesCriptionCat] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [imageCat, setImageCat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imageCat) {
        const formData = new FormData();

        formData.append("file", imageCat);

        const uploadRes = await uploadImage(formData);
        console.log(uploadRes);
        imageUrl = uploadRes.data.metadata.url || "";
      }

      const body = {
        name: nameCat,
        description: descriptionCat,
        parentId: parentCat || null,
        image: imageUrl,
      };

      const res = await createCategory(body);
      if (res) {
        navigate("/category");
        toast.success("Create new category success");
      } else {
        toast.error("Invalid Cate");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid ###");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="w-full px-3">
        <label className="block font-semibold mb-1">Category Name</label>
        <input
          className="w-full border p-2 rounded"
          value={nameCat}
          onChange={(e) => setNameCat(e.target.value)}
        />
      </div>
      <div className="w-full px-3">
        <label className="block font-semibold mb-1">Category Description</label>
        <input
          className="w-full border p-2 rounded"
          value={descriptionCat}
          onChange={(e) => setDesCriptionCat(e.target.value)}
        />
      </div>
      <div className="flex w-full justify-between">
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Parent Id</label>
          <div className="w-full px-3">
            <label className="block font-semibold mb-1">Parent Category</label>
            <select
              className="w-full border p-2 rounded"
              value={parentCat}
              onChange={(e) => setParentCat(e.target.value)}
            >
              <option value="">-- None --</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.cat_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full px-3">
          <label className="block font-semibold mb-1">Category Image</label>

          <label htmlFor="image">
            <img
              className="w-20"
              src={
                !imageCat ? image.upload_area : URL.createObjectURL(imageCat)
              }
              alt=""
            />
            <input
              onChange={(e) => setImageCat(e.target.files[0])}
              type="file"
              accept="image/*"
              id="image"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="space-x-2 ml-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Thêm mới
        </button>
        <Link
          to="/category"
          type="button"
          className="px-4 py-2 bg-gray-400 rounded"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
};

export default CreateCategory;
