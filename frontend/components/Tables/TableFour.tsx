import React, { useEffect, useState } from "react";
import { getAgent, deleteAgent } from "@/services/Agent";
import ResetPassword from "@/components/ResetPassword";
import { useRouter } from "next/navigation";
import { Observer } from "mobx-react"
import { handleAngent } from "@/store/agentStore";
const TableFour: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState([])
  // var user: any[] = [];
  useEffect(() => {
    const init = async () => {
      if (window.localStorage.getItem('token')) {
        const userInfo = await getAgent();
        setUser(userInfo);
        await handleAngent.loadAgent(userInfo);
      }
      else router.push('/');
    }
    init()
  }, []);
  // console.log("useer", user)

  const [isReset, setReset] = useState(false);
  const delUser = async (id: any) => {
    const delId = await deleteAgent(id);
    handleAngent.delAgent(delId);
  }
  return <Observer>{() => {
    const { users, errors } = handleAngent;
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

            {users && users.map((brand, key) => (
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
  }}</Observer>
};

export default TableFour;
