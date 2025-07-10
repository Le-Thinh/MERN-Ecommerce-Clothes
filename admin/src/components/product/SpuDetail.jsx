import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageBreadcrumb from "../common/PageBreadcrumb";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllSkuBySpuId,
  getSpu,
  publishSku,
  publishSpu,
  unPublishSku,
  unPublishSpu,
} from "../../api/product.api";
import { toast } from "react-toastify";
import { image } from "../../assets";
import { useLoadingContext } from "../../contexts";
import ToggleSwitch from "../form/form-elements/ToggleSwitch";

const SpuDetail = () => {
  const { spuId } = useParams();
  const [oneSpu, setOneSpu] = useState({});
  const [skus, setSkus] = useState([]);
  const { setLoading } = useLoadingContext();
  const navigate = useNavigate();

  const handlePublishSku = async (skuId) => {
    try {
      const res = await publishSku(skuId);
      if (res) {
        if (res.data.metadata.status === "publish") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchOneSpu?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid");
    }
  };

  const handleUnPublishSku = async (skuId) => {
    try {
      const res = await unPublishSku(skuId);
      if (res) {
        if (res.data.metadata.status === "draft") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchOneSpu?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid");
    }
  };

  const handlePublishSpu = async (spuId) => {
    try {
      const res = await publishSpu(spuId);
      if (res) {
        if (res.data.metadata.status === "publish") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchOneSpu?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid");
    }
  };

  const handleUnPublishSpu = async (spuId) => {
    try {
      const res = await unPublishSpu(spuId);
      if (res) {
        if (res.data.metadata.status === "draft") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchOneSpu?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid");
    }
  };

  const fetchOneSpu = async () => {
    setLoading(true);
    try {
      const res = await getSpu(spuId);
      if (res) {
        const dataSpu = res.data.metadata || {};
        setOneSpu(dataSpu);

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

  useEffect(() => {
    fetchOneSpu();
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle={"SPU Detail"} />

      <ComponentCard title={"Product Detail"}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-5">
            <div>
              <Label className="font-bold">
                Product Id: {oneSpu.product_id}
              </Label>
            </div>

            <div>
              <Label className="font-bold">Product Name:</Label>
              <span className="ml-5 mt-2 block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {oneSpu.product_name}
              </span>
            </div>

            <div>
              <Label className="font-bold">Product Description:</Label>
              <span className="ml-5 mt-2 block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {oneSpu.product_description}
              </span>
            </div>

            <div>
              <Label className="font-bold">Product Price Default:</Label>
              <span className="ml-5 mt-2 block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {oneSpu?.product_price?.toLocaleString("vi-VN")} VND
              </span>
            </div>

            <div className="">
              <Label className="font-bold">Product Price Default:</Label>
              <span className="flex ml-5 mt-2 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {oneSpu.product_ratingsAverage}
                <img
                  className="w-[18px] object-contain"
                  src={image.StarYellow}
                  alt=""
                />
              </span>
            </div>
          </div>
          <div>
            {/* THUMB */}
            <div className="flex flex-col gap-5">
              <div className="text-end">
                <button
                  onClick={() => navigate(`/products/edit/${spuId}`)}
                  className="bg-blue-400 px-3 py-2 rounded text-white hover:bg-blue-600 transition-all duration-500"
                >
                  Edit Product
                </button>
              </div>

              <div className="mt-5">
                <Label>Product Thumb:</Label>
                <div className="grid grid-cols-3 gap-3">
                  {oneSpu.product_thumb?.map((thm, index) =>
                    thm ? (
                      <div key={index}>
                        <img
                          className="object-cover w-[100px] h-[100px] border"
                          src={thm}
                          alt={`thumb-${index}`}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>

              {/* VARIATION */}
              <div className="">
                <Label>Product Variations:</Label>
                {oneSpu.product_variations?.map((va, index) => (
                  <div className="" key={index}>
                    <span className="ml-5 mt-2 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {va.name}:{" "}
                      {va.options.map((opt, index) => (
                        <span className="font-normal" key={index}>
                          {opt}{" "}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

              {/* DRAFT - PUBLIC */}

              <div>
                <Label>DRAFT - PUBLISH</Label>
                <div className="space-x-3">
                  <button
                    onClick={() => handleUnPublishSpu(oneSpu._id)}
                    className={`duration-200 px-3 py-1  text-white rounded ${
                      oneSpu.isDraft
                        ? "bg-blue-500 hover:bg-blue-600/70"
                        : "bg-gray-500 hover:bg-gray-600/70"
                    }`}
                  >
                    draft
                  </button>
                  <button
                    onClick={() => handlePublishSpu(oneSpu._id)}
                    className={`duration-200 px-3 py-1  text-white rounded ${
                      oneSpu.isPublished
                        ? "bg-blue-500 hover:bg-blue-600/70"
                        : "bg-gray-500 hover:bg-gray-600/70"
                    }`}
                  >
                    publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label>SKU LIST</Label>
          <div className="flex flex-col gap-5">
            {skus.map((sku, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-800"
              >
                <div>
                  <Label>SKU ID: {sku.sku_id}</Label>
                </div>
                <div className="">
                  <Label className={"flex gap-2"}>
                    SKU TIER IDX:{" "}
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {sku.sku_tier_idx.length < 2
                        ? sku.sku_tier_idx
                        : sku.sku_tier_idx.map((item, index) => (
                            <span key={index}>{item}</span>
                          ))}
                    </span>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Label>SKU PRICE:</Label>
                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                    {sku.sku_price.toLocaleString("vi-VN")} VNĐ
                  </span>
                </div>

                <div className="">
                  <div>
                    <Label>DRAFT - PUBLISH:</Label>
                    <div className="space-x-3 px-3 py-2">
                      <button
                        onClick={() => handleUnPublishSku(sku._id)}
                        className={`duration-200 px-3 py-1  text-white rounded ${
                          sku.isDraft
                            ? "bg-blue-500 hover:bg-blue-600/70"
                            : "bg-gray-500 hover:bg-gray-600/70"
                        }`}
                      >
                        draft
                      </button>
                      <button
                        onClick={() => handlePublishSku(sku._id)}
                        className={`duration-200 px-3 py-1  text-white rounded ${
                          sku.isPublished
                            ? "bg-blue-500 hover:bg-blue-600/70"
                            : "bg-gray-500 hover:bg-gray-600/70"
                        }`}
                      >
                        publish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentCard>
    </>
  );
};

export default SpuDetail;
