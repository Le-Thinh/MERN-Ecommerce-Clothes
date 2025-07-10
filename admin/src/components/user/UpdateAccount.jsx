import React, { useEffect } from "react";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadcrumb";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useParams } from "react-router";
import { useShopContext } from "../../contexts";
import { getUserForUpdate } from "../../api/user.api";
import { toast } from "react-toastify";
import PhoneInput from "../form/group-input/PhoneInput";
import Select from "../form/Select";
import DatePicker from "../form/date-picker";
import ToggleSwitch from "../form/form-elements/ToggleSwitch";

const UpdateAccount = () => {
  const countries = [
    { code: "VN", label: "+84" },
    { code: "US", label: "+1" },
  ];

  const options = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
    { value: "other", label: "Khác" },
  ];

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    console.log("Updated phone number:", phoneNumber);
  };

  const { userId } = useParams();

  const { user, setUser } = useShopContext();

  const fetchUser = async () => {
    try {
      const res = await getUserForUpdate(userId);
      const userData = res.data.metadata || {};
      setUser(userData);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Fetch User");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [setUser]);

  return (
    <form>
      <div>
        <PageBreadcrumb pageTitle={"Update User"} />
        <div className=" overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <ComponentCard title="Update User">
            <div className=" grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <Label>Email</Label>
                  <div className="relative">
                    <Input
                      placeholder="info@gmail.com"
                      type="text"
                      className="pl-[62px]"
                      value={user.usr_email}
                      disabled
                    />
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.0415 7.06206V14.375C3.0415 14.6511 3.26536 14.875 3.5415 14.875H16.4582C16.7343 14.875 16.9582 14.6511 16.9582 14.375V7.06245L11.1441 11.1168C10.4568 11.5961 9.54348 11.5961 8.85614 11.1168L3.0415 7.06206ZM16.9582 5.19262C16.9582 5.19341 16.9582 5.1942 16.9582 5.19498V5.20026C16.957 5.22216 16.9458 5.24239 16.9277 5.25501L10.2861 9.88638C10.1143 10.0062 9.88596 10.0062 9.71412 9.88638L3.0723 5.25485C3.05318 5.24151 3.04178 5.21967 3.04177 5.19636C3.04176 5.15695 3.0737 5.125 3.1131 5.125H16.8869C16.925 5.125 16.9562 5.15494 16.9582 5.19262ZM18.4582 5.21428V14.375C18.4582 15.4796 17.5627 16.375 16.4582 16.375H3.5415C2.43693 16.375 1.5415 15.4796 1.5415 14.375V5.19498C1.5415 5.1852 1.54169 5.17546 1.54206 5.16577C1.55834 4.31209 2.25546 3.625 3.1131 3.625H16.8869C17.7546 3.625 18.4582 4.32843 18.4583 5.19622C18.4583 5.20225 18.4582 5.20826 18.4582 5.21428Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Name</Label>
                  <div className="relative">
                    <Input
                      placeholder="info@gmail.com"
                      type="text"
                      className="pl-[62px]"
                      value={user.usr_name}
                    />
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.0415 7.06206V14.375C3.0415 14.6511 3.26536 14.875 3.5415 14.875H16.4582C16.7343 14.875 16.9582 14.6511 16.9582 14.375V7.06245L11.1441 11.1168C10.4568 11.5961 9.54348 11.5961 8.85614 11.1168L3.0415 7.06206ZM16.9582 5.19262C16.9582 5.19341 16.9582 5.1942 16.9582 5.19498V5.20026C16.957 5.22216 16.9458 5.24239 16.9277 5.25501L10.2861 9.88638C10.1143 10.0062 9.88596 10.0062 9.71412 9.88638L3.0723 5.25485C3.05318 5.24151 3.04178 5.21967 3.04177 5.19636C3.04176 5.15695 3.0737 5.125 3.1131 5.125H16.8869C16.925 5.125 16.9562 5.15494 16.9582 5.19262ZM18.4582 5.21428V14.375C18.4582 15.4796 17.5627 16.375 16.4582 16.375H3.5415C2.43693 16.375 1.5415 15.4796 1.5415 14.375V5.19498C1.5415 5.1852 1.54169 5.17546 1.54206 5.16577C1.55834 4.31209 2.25546 3.625 3.1131 3.625H16.8869C17.7546 3.625 18.4582 4.32843 18.4583 5.19622C18.4583 5.20225 18.4582 5.20826 18.4582 5.21428Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <Label>Phone</Label>
                  <PhoneInput
                    selectPosition="start"
                    countries={countries}
                    placeholder="+1 (555) 000-0000"
                    onChange={handlePhoneNumberChange}
                  />
                </div>

                <div>
                  <DatePicker
                    id="date-picker"
                    label="BirthDate"
                    placeholder="Select a date"
                    onChange={(dates, currentDateString) => {
                      // Handle your logic
                      console.log({ dates, currentDateString });
                    }}
                  />
                </div>
                <div className="flex gap-5">
                  <button className="px-3 py-2 bg-blue-400 rounded text-theme-sm text-white hover:bg-blue-600">
                    SAVE
                  </button>
                  <button className="px-3 py-2 bg-gray-400 rounded text-theme-sm text-white hover:bg-red-400">
                    CANCEL
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Label>Avatar</Label>
                  <div className="relative w-35 h-35">
                    {/* Ảnh avatar */}
                    <img
                      className="w-full h-full object-cover rounded-full border border-gray-300"
                      src={user.usr_avatar || "/avatar.svg"}
                      alt="avatar"
                    />
                    <button
                      // onClick={() => fileInputRef.current.click()}
                      type="button"
                      className="absolute inset-0 bg-black/50 text-white text-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      Edit Avatar
                    </button>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={"fileInputRef"}
                      className="hidden"
                      onChange={"handleFileChange"}
                    />
                  </div>
                </div>
                <div>
                  <Label>Sex</Label>
                  <Select
                    options={options}
                    placeholder="Select an option"
                    onChange={handleSelectChange}
                    className="dark:bg-dark-900"
                    defaultValue={user.usr_date_of_birth}
                  />
                </div>
                <div>
                  <ToggleSwitch title={"Status"} name={"Active"} />
                </div>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </form>
  );
};

export default UpdateAccount;
