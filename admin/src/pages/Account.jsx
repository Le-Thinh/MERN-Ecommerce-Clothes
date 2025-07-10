import React from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import ComponentCard from "../components/common/ComponentCard";
import ListUser from "../components/user/ListUser";

const Account = () => {
  return (
    <>
      <div className="space-y-6">
        <ListUser />
      </div>
    </>
  );
};

export default Account;
