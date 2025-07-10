import React, { useEffect, useState } from "react";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import PageMeta from "../common/PageMeta";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadcrumb";
import { image } from "../../assets";
import { useShopContext } from "../../contexts";
import { getAllCategory } from "../../api/category.api";
import { toast } from "react-toastify";
import { Modal } from "../modal";
import { Link } from "react-router";
import MultiSelect from "../form/MultiSelect";
import { uploadImage } from "../../api/upload.api";
import { createNewSpu } from "../../api/product.api";

const CreateSpu = () => {
  const [imageProducts, setImageProducts] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const { categories, setCategory } = useShopContext();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  // const [productThumb, setProductThumb] = useState([]);
  // const [productAttributes, setProductAttributes] = useState([]);
  const [productVariations, setProductVariations] = useState([]);
  const [sku, setSku] = useState([]);

  // const generateSkuList = (productVariations) => {
  //   const lengthArr = productVariations.
  //   const SkuList = Array()
  // }

  const handleImageChange = (index, file) => {
    const updatedImages = [...imageProducts];
    updatedImages[index] = file;
    setImageProducts(updatedImages);
  };

  function generateSkuCombinations(variations) {
    if (variations.length === 0) return [];

    const result = [];

    const dfs = (index, path) => {
      if (index === variations.length) {
        result.push([...path]);
        return;
      }

      for (let i = 0; i < variations[index].options.length; i++) {
        path.push(i);
        dfs(index + 1, path);
        path.pop();
      }
    };

    dfs(0, []);
    return result;
  }

  const getOptionLabel = (sku_tier_idx) => {
    return sku_tier_idx
      .map((idx, i) => productVariations[i]?.options[idx])
      .join(" - ");
  };

  const updateSkuListFromVariations = () => {
    const combinations = generateSkuCombinations(productVariations);
    const skuList = combinations.map((tier) => ({
      sku_tier_idx: tier,
      sku_price: 0,
      sku_stock: 0,
    }));

    setSku(skuList);
  };

  const addVariations = async () => {
    setProductVariations([...productVariations, { name: "", options: [""] }]);
  };

  const handleVariationNameChange = (index, value) => {
    const updated = [...productVariations];
    updated[index].name = value;
    setProductVariations(updated);
  };

  const handleOptionChange = (varIdx, optIdx, value) => {
    const updated = [...productVariations];
    updated[varIdx].options[optIdx] = value;
    setProductVariations(updated);
  };

  const addOptionToVariation = (index) => {
    const updated = [...productVariations];
    updated[index].options.push("");
    setProductVariations(updated);
  };

  const removeOptionFromVariation = (varIdx, optIdx) => {
    const updated = [...productVariations];
    updated[varIdx].options.splice(optIdx, 1);
    setProductVariations(updated);
  };

  const removeVariation = (index) => {
    const updated = [...productVariations];
    updated.splice(index, 1);
    setProductVariations(updated);
  };

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

  useEffect(() => {
    if (productVariations.length > 0) {
      updateSkuListFromVariations();
    }
  }, [productVariations]);

  // Update value

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product_thumb = imageProducts.filter(Boolean); // bỏ các ảnh null

      const uploadedUrls = [];

      for (const file of product_thumb) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await uploadImage(formData);

        if (res?.data?.metadata?.url) {
          uploadedUrls.push(res.data.metadata.url);
        } else {
          throw new Error("Upload failed for one or more images");
        }
      }

      const sanitizedSkuList = sku.map((item) => ({
        sku_tier_idx: item.sku_tier_idx,
        sku_price: Number(item.sku_price) || 0,
        sku_stock: Number(item.sku_stock) || 0,
      }));

      const body = {
        product_name: productName,
        product_thumb: uploadedUrls, // ảnh là URL
        product_description: productDescription,
        product_price: Number(productPrice),
        product_quantity: Number(productQuantity),
        product_category: productCategory,
        // product_attributes,
        product_variations: productVariations,
        sku_list: sanitizedSkuList,
      };

      const res = await createNewSpu(body);
      console.log(body);
      if (res) {
        toast.success("Tạo sản phẩm thành công");
      } else {
        toast.error("Tạo sản phẩm thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Create New Spu");
    }
  };

  return (
    <>
      <PageMeta title="New Product" description="New Product" />
      <PageBreadcrumb pageTitle={"Tạo mới sản phẩm"} />
      <ComponentCard>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 bg-white rounded-xl shadow-md"
        >
          <div>
            <Label>Tên sản phẩm</Label>
            <Input
              name="product_name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Áo thun..."
            />
          </div>

          <div>
            <Label>Mô tả</Label>
            <textarea
              name="product_description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Nhập mô tả"
              className="w-full h-24 border rounded-lg px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giá cơ bản</Label>
              <Input
                name="product_price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="111000"
              />
            </div>

            <div>
              <Label>Số lượng</Label>
              <Input
                name="product_quantity"
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                placeholder="23"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Danh mục (IDs, cách nhau bởi dấu phẩy)</Label>
              <MultiSelect
                label="Multiple Select Options"
                options={categories.map((c) => ({
                  value: c._id,
                  text: c.cat_name,
                }))}
                defaultSelected={productCategory}
                onChange={setProductCategory}
              />
              <p className="sr-only">
                Selected Values: {productCategory.join(", ")}
              </p>
            </div>

            <div>
              <Label>Thumbnail</Label>
              <div className="grid grid-cols-3 gap-3">
                {imageProducts.map((img, index) => (
                  <div key={index} className="w-[80px] h-[80px]">
                    <Label htmlFor={`image-${index}`}>
                      <img
                        className="w-20 h-20 object-cover border rounded"
                        src={img ? URL.createObjectURL(img) : image.upload_area}
                        alt={`thumb-${index}`}
                      />
                      <Input
                        id={`image-${index}`}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handleImageChange(index, e.target.files[0])
                        }
                      />
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label>Tuỳ chọn bổ sung</Label>
            <div className="grid grid-cols-2 gap-6">
              <div>
                {productVariations.map((variation, varIdx) => (
                  <div
                    key={varIdx}
                    className="border p-4 mb-4 rounded-lg space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Tên tuỳ chọn (VD: Màu sắc)"
                        value={variation.name}
                        onChange={(e) =>
                          handleVariationNameChange(varIdx, e.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeVariation(varIdx)}
                        className="text-red-500 hover:underline"
                      >
                        Xoá loại
                      </button>
                    </div>

                    {variation.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <Input
                          placeholder={`Giá trị ${optIdx + 1}`}
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(varIdx, optIdx, e.target.value)
                          }
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeOptionFromVariation(varIdx, optIdx)
                          }
                          className="text-red-400 hover:text-red-600"
                        >
                          X
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOptionToVariation(varIdx)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      + Thêm giá trị
                    </button>
                  </div>
                ))}
              </div>
              <div>
                {productVariations.length >= 1 && (
                  <div className="space-y-6">
                    <Label>SKU LIST</Label>
                    {sku.map((item, index) => (
                      <div key={index} className="flex gap-6 items-end">
                        <div className="w-[150px]">
                          <Label>Option</Label>
                          <span>{getOptionLabel(item.sku_tier_idx)}</span>
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input
                            type="number"
                            value={item.sku_price}
                            onChange={(e) => {
                              const updated = [...sku];
                              updated[index].sku_price = e.target.value;
                              setSku(updated);
                            }}
                          />
                        </div>
                        <div>
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            value={item.sku_stock}
                            onChange={(e) => {
                              const updated = [...sku];
                              updated[index].sku_stock = e.target.value;
                              setSku(updated);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={addVariations}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              + Thêm tuỳ chọn
            </button>
          </div>

          {/* You can build nested components for attributes and variations below */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-theme-sm rounded hover:bg-blue-700"
            >
              Tạo sản phẩm
            </button>
            <Link
              type="submit"
              to={"/products"}
              className="mt-4 px-4 py-2 bg-gray-200 text-black text-theme-sm rounded hover:bg-gray-300"
            >
              Hủy
            </Link>
          </div>
        </form>
      </ComponentCard>
    </>
  );
};

export default CreateSpu;
