import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { useShopContext } from "../contexts";
import { toast } from "react-toastify";
import { getDataSpuBySlug } from "../api/product.api";
import { addToCart } from "../api/cart.api";

const ProductDetail = () => {
  const { product_slug } = useParams();
  const { spu, setSpu } = useShopContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [skuList, setSkuList] = useState([]);
  const [selectedSkuIndex, setSelectedSkuIndex] = useState(null);
  const navigate = useNavigate();
  // const sizeOrder = ["S", "M", "L", "XL"];

  // const [size, setSize] = useState("");

  const fetchSpu = async (slug) => {
    try {
      const res = await getDataSpuBySlug(slug);
      if (res) {
        const dataSPU = res.data?.metadata.spu_info || {};
        const skuList = res.data?.metadata.sku_list || [];

        const sortedSkuList = [...skuList].sort((a, b) => {
          const aIdx = a.sku_tier_idx?.[0] ?? 0;
          const bIdx = b.sku_tier_idx?.[0] ?? 0;
          return aIdx - bIdx;
        });
        setSpu(dataSPU);
        setSkuList(sortedSkuList);
      } else {
        toast.error("Fetch Data Failure");
      }
    } catch (error) {
      toast.error("Invalid Fetch Data ");
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    const clientId = localStorage.getItem("x-client-id");
    const accessToken = localStorage.getItem("authorization");

    if (!clientId || !accessToken) {
      toast.warn("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      navigate("/dang-nhap");
      return;
    }

    if (selectedSkuIndex === null || !skuList[selectedSkuIndex]) {
      toast.warn(
        "Vui lòng chọn phân loại sản phẩm trước khi thêm vào giỏ hàng!"
      );
      return;
    }

    const selectedSku = skuList[selectedSkuIndex];

    const label =
      spu.product_variations?.[0]?.options?.[selectedSku.sku_tier_idx[0]];

    const product = {
      sku_id: selectedSku.sku_id,
      quantity: 1,
      name: spu.product_name,
      price: selectedSku.sku_price,
      thumb: spu.product_thumb?.[0],
      option: label,
    };

    try {
      const res = await addToCart(clientId, accessToken, product);
      if (res.data) {
        toast.success("Đã thêm sản phẩm vào giỏ hàng!");
        return 1;
      } else {
        toast.error("Không thể thêm vào giỏ hàng!");
        return 0;
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleBuyNow = async () => {
    const success = await handleAddToCart();
    if (success) {
      navigate("/gio-hang");
    }
  };

  useEffect(() => {
    if (spu.product_thumb?.length > 0) {
      setSelectedImage(spu.product_thumb[0]);
    }
  }, [spu.product_thumb]);

  useEffect(() => {
    fetchSpu(product_slug);
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex mt-[100px]">
        <div className="block p-2.5 box-border">
          <div className="grid grid-cols-[1fr_2fr]">
            <div className="ml-auto mt-5">
              <div className="grid grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] gap-12 mr-5">
                {spu.product_thumb?.slice(0, -1).map((thumb, index) => (
                  <img
                    key={index}
                    className="w-[120px] h-[120px] object-cover rounded"
                    src={thumb}
                    alt=""
                    onClick={() => setSelectedImage(thumb)}
                  />
                ))}
              </div>
            </div>
            <div className="max-w-[580px]">
              {selectedImage && (
                <img
                  className="rounded-lg w-[580px] h-[550px] float-right object-cover mb-2.5 overflow-hidden"
                  src={selectedImage}
                  alt=""
                />
              )}
              {spu.product_thumb?.length > 0 && (
                <img
                  className="h-auto max-w-[580px] float-right"
                  src={spu.product_thumb[spu.product_thumb.length - 1]}
                  alt=""
                />
              )}
            </div>
          </div>
          <div id="detail-product" className="ml-[180px] mt-5">
            <h1 className="uppercase text-[#ea1b25] barlow3 text-[26px] underline">
              chi tiết sản phẩm
            </h1>
            <h1 className="barlow3 text-xl mt-2.5">
              {spu.product_description}
            </h1>
          </div>
        </div>
        <div className="w-full flex-[0.7] flex-col mt-2.5 px-2.5 box-border h-[550px]">
          <div className="grid text-left w-full gap-2.5 h-full">
            <h2 className="w-[300px] text-3xl mb-2.5 text-[#ea1b25] barlow5 uppercase">
              {spu.product_name}
            </h2>
            <p className="barlow3 text-2xl text-[#000]">
              {spu.product_price?.toLocaleString("vi-VN")} VNĐ
            </p>
            <div className="w-full flex items-center">
              <p className="text-2xl barlow4 mt-9 text-[#000]">Lựa chọn</p>
            </div>
            <div className="mt-5 block items-center">
              <div className="gap-2.5 flex">
                {skuList.map((sku, index) => {
                  const label =
                    spu.product_variations?.[0]?.options?.[
                      sku.sku_tier_idx[0]
                    ] || `Size ${index}`;
                  return (
                    <div key={sku.sku_id}>
                      <input
                        id={`size-${index}`}
                        type="checkbox"
                        onChange={() => setSelectedSkuIndex(index)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`size-${index}`}
                        className={`flex ${
                          selectedSkuIndex === index
                            ? "bg-[#ea1b25] text-white"
                            : "text-[#333]"
                        } items-center justify-center px-2.5 border-2 border-[#ddd] rounded-lg cursor-pointer text-[25px] h-[48px] text-center`}
                      >
                        {label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="w-lg">
              <button
                onClick={() => handleAddToCart()}
                className="uppercase text-[#39465F] h-[62px] w-[60%] cursor-pointer border rounded-lg text-[25px] mt-5 barlow4 font-normal"
                type="submit"
              >
                thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                className="uppercase text-white bg-[#ea1b25] h-[62px] w-[60%] cursor-pointer border rounded-lg text-[25px] mt-5 barlow4 font-normal"
                type="submit"
              >
                mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
