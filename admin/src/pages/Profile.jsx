import React from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadcrumb";
import UserMetaCard from "../components/ui/profile/UserMetaCard";
import UserInfoCard from "../components/ui/profile/UserInfoCard";
import UserAddressCard from "../components/ui/profile/UserAddressCard";

const Profile = () => {
  return (
    <>
      <PageMeta title="Profile" description="Profile Dashboard" />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </>
  );
};

export default Profile;
