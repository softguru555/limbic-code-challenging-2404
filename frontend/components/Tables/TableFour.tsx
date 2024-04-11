import React, { useEffect, useState } from "react";
import { getAgent, deleteAgent } from "@/services/Agent";
import { useDispatch, useSelector } from "react-redux";
import ResetPassword from "@/components/ResetPassword";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
const TableFour: React.FC = () => {
  const router = useRouter();
  const contextData = useContext(UserContext);
  const dispatch = useDispatch();
  const auth = contextData.userInfo;
  var user: any[] = [];
  useEffect(() => {
    const init = async () => {
      if (window.localStorage.getItem('token')) {
        user = await getAgent();
        await contextData.setUsers(user)
      }
      else router.push('/');
    }
    init()
  }, []);
  user = contextData.users;
  const [isReset, setReset] = useState(false);
  const delUser = async (id: any) => {
    const delId = await deleteAgent(id);
    await contextData.delUser(delId);
  }

  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Users
            </h4>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Role
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-4">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                action
              </h5>
            </div>
          </div>

          {user.map((brand, key) => (
            <div
              className="grid grid-cols-3 sm:grid-cols-4"
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden font-medium text-black dark:text-white sm:block">
                  {brand.username}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-black dark:text-white">
                  {brand.email}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="font-medium text-meta-3">{brand.role}</p>
              </div>

              <div className="items-center justify-center p-2.5 sm:flex ">
                <button
                  className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                  onClick={() => delUser(brand.id)}
                  name={brand.id}
                >
                  Delete
                </button>
                <button
                  className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                  onClick={() => setReset(true)}
                >
                  Reset
                </button>
              </div>
              <ResetPassword isReset={isReset} setReset={setReset} id={brand.id}></ResetPassword>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
