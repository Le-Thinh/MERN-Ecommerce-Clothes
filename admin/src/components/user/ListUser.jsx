import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useShopContext } from "../../contexts";
import { changeStatusUser, getAllUsers } from "../../api/user.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../common/PageBreadcrumb";
import ComponentCard from "../common/ComponentCard";

const ListUser = () => {
  const { users, setUsers } = useShopContext();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      const usersData = res?.data?.metadata || [];
      setUsers(usersData);
    } catch (error) {
      console.error(error);
      toast.error("Invalid Request User");
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      const res = await changeStatusUser(id);
      if (res) {
        toast.success("Change Status User Success");
        fetchUsers?.();
      } else {
        toast.error("Change Status Error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid Change Status User");
    }
  };

  const handleShowUpdate = (id) => {
    setSelectedUserId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    fetchUsers();
  }, [setUsers]);

  return (
    <>
      <PageBreadcrumb pageTitle="Users" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <ComponentCard title={"List Users"}>
            <Table>
              {/* Table Header */}
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
                    Avatar
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Id
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
                    Email
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Reset Password
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  ></TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {Array.isArray(users) &&
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {index + 1}
                        </span>
                      </TableCell>

                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img
                              width={40}
                              height={40}
                              src={user.usr_avatar || "/avatar.svg"}
                              alt={user.usr_name}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.usr_id}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.usr_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.usr_email}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            user.usr_status === "active"
                              ? "success"
                              : user.status === "pending"
                              ? "warning"
                              : "error"
                          }
                        >
                          {user.usr_status}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 `}
                      >
                        <button
                          onClick={() => handleChangeStatus(user._id)}
                          className={`text-theme-sm px-3 py-2 rounded-xl text-white ${
                            user.usr_status === "active"
                              ? "bg-amber-400/85 hover:bg-amber-400"
                              : "bg-gray-300 hover:bg-blue-300 transition-all duration-300"
                          }`}
                        >
                          {user.usr_status === "active" ? "disable" : "active"}
                        </button>
                      </TableCell>
                      <TableCell
                        className={`px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 `}
                      >
                        <button
                          // onClick={() => handleChangeStatus(user._id)}
                          className={`text-theme-sm px-3 py-2 rounded-xl text-white bg-blue-500/80 hover:bg-blue-500`}
                        >
                          Reset
                        </button>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-end">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleShowUpdate(user._id)}
                            className="text-gray-600 hover:text-blue-500 "
                            title="Toggle Update"
                          >
                            {selectedUserId === user._id ? (
                              <MdArrowBackIos />
                            ) : (
                              <MdArrowForwardIos />
                            )}
                          </button>

                          <div
                            className={`transition-all duration-300 overflow-hidden ${
                              selectedUserId === user._id
                                ? "w-auto opacity-100"
                                : "w-0 opacity-0"
                            }`}
                          >
                            <button
                              onClick={() => navigate(`update/${user._id}`)}
                              className="bg-blue-600 text-white text-sm px-3 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default ListUser;
