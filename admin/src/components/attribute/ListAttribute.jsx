import React, { useEffect, useState } from "react";
import PageMeta from "../common/PageMeta";
import PageBreadcrumb from "../common/PageBreadcrumb";
import ComponentCard from "../common/ComponentCard";
import { data, Link, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../modal";
import {
  createAttribute,
  deleteAttribute,
  getAllAttribute,
  publishAttribute,
  unPublishAttribute,
} from "../../api/attribute.api";
import { toast } from "react-toastify";
import { randomId } from "../../utils";
import { useLoadingContext, useShopContext } from "../../contexts";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Swal from "sweetalert2";

const ListAttribute = () => {
  const { attributes, setAttributes } = useShopContext();
  const { setLoading } = useLoadingContext();
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [attributeName, setAttributeName] = useState("");
  const [attributeValues, setAttributeValues] = useState([
    { value_id: randomId(), value: "" },
  ]);

  const handleDeleteAttribute = async (id) => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: "Xác nhận xoá?",
        text: "Bạn có chắc chắn muốn xoá danh mục này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Huỷ",
      });

      if (!result.isConfirmed) return;

      const res = await deleteAttribute(id);
      if (res) {
        toast.success("Successfully");
        fetchAttributes?.();
      } else {
        toast.error("Fetch Data Attribute Failure");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    } finally {
      setLoading(false);
    }
  };

  const handleDraft = async (id) => {
    try {
      const res = await unPublishAttribute(id);
      if (res) {
        if (res.data.metadata.status === "draft") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchAttributes?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    }
  };

  const handlePublish = async (id) => {
    try {
      const res = await publishAttribute(id);
      if (res) {
        if (res.data.metadata.status === "publish") {
          toast.info(res.data.metadata.message);
        } else {
          toast.success("Successfully");
          fetchAttributes?.();
        }
      } else {
        toast.error("UnPublish Failure!!");
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Delete Category");
    }
  };

  const fetchAttributes = async () => {
    setLoading(true);
    try {
      const res = await getAllAttribute();
      if (res) {
        const dataAttributes = res.data?.metadata || [];
        setAttributes(dataAttributes);
      } else {
        toast.error("Fetch Data Attribute Failure");
      }
    } catch (error) {
      console.log(error);
      toast.error("FetchData Failure");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAttribute = async () => {
    try {
      const body = {
        attribute_name: attributeName,
        attribute_value: attributeValues,
      };

      console.log(body);

      const res = await createAttribute(body);
      console.log("RES:::: ", res);
      if (res) {
        toast.success("Create new attribute success");
        closeModal();
        setAttributeName("");
        setAttributeValues([{ value_id: randomId(), value: "" }]);
      } else {
        toast.error("Invalid attribute");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid create new attribute");
    }
  };

  const addValueField = () => {
    setAttributeValues([
      ...attributeValues,
      { value_id: randomId(), value: "" },
    ]);
  };

  const handleValueChange = (index, value) => {
    const updated = [...attributeValues];
    updated[index].value = value;
    setAttributeValues(updated);
  };

  const removeValueField = (index) => {
    const updated = [...attributeValues];
    updated.splice(index, 1);
    setAttributeValues(updated);
  };

  const handleSubmit = async () => {
    if (!attributeName.trim()) {
      toast.warning("Attribute name is required");
      return;
    }

    if (
      attributeValues.length === 0 ||
      attributeValues.some((val) => !val.value.trim())
    ) {
      toast.warning("All attribute values are required");
      return;
    }

    await handleCreateAttribute();
  };

  useEffect(() => {
    fetchAttributes();
  }, [setAttributes]);

  return (
    <>
      <PageMeta title={"Attributes"} description="Attributes" />
      <PageBreadcrumb pageTitle={"Attributes"} />
      <ComponentCard title={"Attributes"}>
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div></div>
            <div>
              <button
                onClick={openModal}
                className="bg-blue-400 px-3 py-2 rounded text-white hover:bg-blue-600 transition-all duration-500"
              >
                New Attribute +
              </button>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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
                    id
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
                    Values
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Pub/unPub
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(attributes) &&
                  attributes.map((att, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {index + 1}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {att.attribute_id}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {att.attribute_name}
                        </span>
                      </TableCell>

                      <TableCell className="flex gap-2 px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {att.attribute_value[0].value}
                        </span>
                        <span className="block text-red-400 font-medium  text-theme-sm dark:text-blue-500/90">
                          (+{att.attribute_value.length - 1})
                        </span>
                      </TableCell>

                      <TableCell className="space-x-2 px-5 py-4 sm:px-6 text-start">
                        <button
                          onClick={() => handleDraft(att._id)}
                          className={`duration-200 px-3 py-1  text-white rounded ${
                            att.isDraft
                              ? "bg-blue-500 hover:bg-blue-600/70"
                              : "bg-gray-500 hover:bg-gray-600/70"
                          }`}
                        >
                          draft
                        </button>
                        <button
                          onClick={() => handlePublish(att._id)}
                          className={`duration-200 px-3 py-1  text-white rounded ${
                            att.isPublished
                              ? "bg-blue-500 hover:bg-blue-600/70"
                              : "bg-gray-500 hover:bg-gray-600/70"
                          }`}
                        >
                          publish
                        </button>
                      </TableCell>

                      <TableCell className="space-x-3 px-5 py-4 sm:px-6 text-start">
                        <button
                          // onClick={() => handlePublishCat(cat._id)}
                          className={`duration-200 px-3 py-1  text-black rounded shadow p-3 hover:bg-gray-500/70 dark:text-white/90`}
                        >
                          update
                        </button>
                        <button
                          onClick={() => handleDeleteAttribute(att._id)}
                          className={`duration-200 px-3 py-1  text-black rounded bg-red-300 hover:bg-red-500/70 shadow p-3`}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </ComponentCard>

      {/* MODAL */}

      <Modal isOpen={isOpen} onClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-center items-center"
        >
          <div className="p-6 w-[500px]">
            <h2 className="text-lg font-semibold mb-4">Create New Attribute</h2>

            {/* Attribute Name */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                Attribute Name
              </label>
              <input
                type="text"
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter attribute name"
              />
            </div>

            {/* Attribute Values */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">
                Attribute Values
              </label>
              {attributeValues.map((item, index) => (
                <div
                  key={item.value_id}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                    placeholder={`Value ${index + 1}`}
                  />
                  {attributeValues.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeValueField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addValueField}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                + Add Value
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ListAttribute;
