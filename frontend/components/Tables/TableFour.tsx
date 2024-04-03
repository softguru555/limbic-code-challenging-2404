import { BRAND } from "@/types/brand";
import Image from "next/image";
import DropdownDefault from "../Dropdowns/DropdownDefault";
import React, { useEffect, useMemo, useState } from "react";
import { getAgent, deleteAgent } from "@/services/Agent";
import { useDispatch, useSelector } from "react-redux";
const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    visitors: 3.5,
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.2,
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-06.svg",
    name: "Youtube",
    visitors: 2.1,
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Vimeo",
    visitors: 1.5,
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3.5,
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
];

const TableFour: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAgent(dispatch);
  }, [dispatch]);
  const { user } = useSelector((state:any) => state.user);
  const [id, setId] = useState('');
  const [isDeleting, setDelAction] = useState(false);
  const [isEdition, setEdition] = useState(false);
  const delUser = (e) => {
    setId(e.target.name);
    setDelAction(true);
  }
  if(isDeleting == true){
    const data = deleteAgent(dispatch, id);
    console.log("djdjd", data);
    setDelAction(false);
  }
  // useEffect(() => {
  //   if(id != ''){
  //     deleteAgent({dispatch, id});
  //     setDelAction(false);
  //   }
  // }, [isDeleting]);
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Users
            </h4>
          </div>
          <DropdownDefault />
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
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === brandData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
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
                onClick={delUser}
                name={brand.id}
              >
                delete
              </button>
              <button
                className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                
              >
                edit
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableFour;
