import React from "react";
import PageBreadcrumb from "../common/PageBreadcrumb";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoadingContext, useShopContext } from "../../contexts";
import { getAllSkuBySpuId, getSpu, updateProduct } from "../../api/product.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getAllCategory } from "../../api/category.api";
import { image } from "../../assets";
import { uploadImage } from "../../api/upload.api";
import MultiSelect from "../form/MultiSelect";
const EditSpu = () => {
  const { spuId } = useParams();
  const navigate = useNavigate();
  const [skus, setSkus] = useState([]);
  const [oneSpu, setOneSpu] = useState();
  const { setLoading } = useLoadingContext();
  const { categories, setCategory } = useShopContext();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [productVariations, setProductVariations] = useState([]);
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

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      setCategory(res?.data?.metadata || []);
    } catch (error) {
      console.error(error);
      toast.error("Không lấy được danh mục");
    }
  };

  const fetchOneSpu = async () => {
    setLoading(true);
    try {
      const res = await getSpu(spuId);
      if (res) {
        const dataSpu = res.data.metadata || {};
        setOneSpu(dataSpu);
        setProductName(dataSpu.product_name || "");
        setProductDescription(dataSpu.product_description || "");
        setProductPrice(dataSpu.product_price || "");
        setProductQuantity(dataSpu.product_quantity || "");
        setProductCategory(dataSpu.product_category || []);
        setProductVariations(dataSpu.product_variations || []);
        setImageProducts(dataSpu.product_thumb || []);

        const skusData = await getAllSkuBySpuId(dataSpu.product_id);

        setSkus(skusData.data?.metadata || []);
      } else {
        toast.error("Fetch Data SPU Failure");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Fetch ONE SPU");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (index, file) => {
    const updatedImages = [...imageProducts];
    updatedImages[index] = file;
    setImageProducts(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadedUrls = [];
      for (const file of imageProducts) {
        if (typeof file === "string") uploadedUrls.push(file);
        else if (file instanceof File) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await uploadImage(formData);
          if (res?.data?.metadata?.url)
            uploadedUrls.push(res.data.metadata.url);
        }
      }

      const sanitizedSkuList = skus.map((item) => ({
        _id: item._id,
        // sku_id: item.sku_id,
        sku_tier_idx: item.sku_tier_idx,
        sku_price: Number(item.sku_price) || 0,
        sku_stock: Number(item.sku_stock) || 0,
      }));

      const body = {
        product_name: productName,
        product_thumb: uploadedUrls,
        product_description: productDescription,
        product_price: Number(productPrice),
        product_quantity: Number(productQuantity),
        product_category: productCategory,
        product_variations: productVariations,
        sku_list: sanitizedSkuList,
      };

      const res = await updateProduct(spuId, body);
      if (res) toast.success("Cập nhật thành công!");
      else toast.error("Cập nhật thất bại!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi cập nhật sản phẩm");
    }
  };

  useEffect(() => {
    fetchOneSpu();
    fetchCategories();
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle={"Cập nhật sản phẩm"} />
      <ComponentCard title={"Chỉnh sửa SPU"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Tên sản phẩm</Label>
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <Label>Mô tả</Label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full h-24 border rounded px-4 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giá</Label>
              <Input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>

            <div>
              <Label>Số lượng</Label>
              <Input
                type="number"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Danh mục</Label>
            <MultiSelect
              options={categories.map((c) => ({
                value: c._id,
                text: c.cat_name,
              }))}
              defaultSelected={productCategory}
              onChange={setProductCategory}
            />
          </div>

          <div>
            <Label>Ảnh sản phẩm</Label>
            <div className="grid grid-cols-3 gap-3">
              {imageProducts.map((img, index) => (
                <div key={index}>
                  <Label htmlFor={`image-${index}`}>
                    <img
                      src={
                        typeof img === "string"
                          ? img
                          : img
                          ? URL.createObjectURL(img)
                          : image.upload_area
                      }
                      alt={`thumb-${index}`}
                      className="w-20 h-20 object-cover border rounded"
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

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>SKU List</Label>
              {skus.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span>
                    {item.sku_tier_idx
                      .map(
                        (tierIdx, i) =>
                          oneSpu.product_variations[i]?.options[tierIdx]
                      )
                      .join(" - ")}
                  </span>
                  <Input
                    type="number"
                    value={item.sku_price}
                    className=""
                    onChange={(e) => {
                      const updated = [...skus];
                      updated[index].sku_price = e.target.value;
                      setSkus(updated);
                    }}
                  />
                  <Input
                    type="number"
                    value={item.sku_stock}
                    onChange={(e) => {
                      const updated = [...skus];
                      updated[index].sku_stock = e.target.value;
                      setSkus(updated);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cập nhật sản phẩm
          </button>
        </form>
      </ComponentCard>
    </>
  );
};

export default EditSpu;
