"use client"
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { createAnswer } from "@/services/Question";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AddQuestion from "@/components/AddQuestion";
import AddAnswer from "@/components/AddAnswer";
import { delAsw } from "@/services/Question";
const Answer = (id) => {
  const [delanswer, setDelAnswer] = useState("");
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.question)
  console.log("questions", questions)
  const data = questions.filter(question => question.id === id.params.answer)
  console.log("data", data[0])
  const [visible, setVisible] = useState(false)
  const delAnswer = (answer) => {
    setDelAnswer(answer)
    delAsw(dispatch, id.params.answer, delanswer);
  }
  return (

    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 grid">
        <div className="mb-6 flex justify-between">
          <div>
            <h4 className="text-title-sm2 font-bold text-black dark:text-white">
              Answers
            </h4>
          </div>
          <button
            onClick={() => setVisible(true)}
          >create
          </button>
          {/* <button></button> */}
        </div>


        <div
          className=""
        >
          {data[0].contents && data[0].contents.map((brand, key) => (
            <div className="mb-6 flex justify-between border-b" key={key}>
              <div className="flex items-center w-100 overflow-hidden " >
                <p className="hidden font-medium text-black dark:text-white sm:block ">{brand.answer}
                </p>
              </div>
              <button onClick={async () => delAnswer(brand.answer)}>del</button>
            </div>
          ))}

        </div>
        <AddAnswer visible={visible} setVisible={setVisible} id={id.params.answer} />
      </div>
    </div>

    // <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    //   <div className="mb-6 flex justify-between border-b">
    //     <div>
    //       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
    //         Details
    //       </h4>
    //     </div>

    //     <button
    //       onClick={() => setVisible(true)}
    //     >create
    //     </button>
    //   </div>
    //   <div className="flex flex-col">
    //     <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4">
    //       <div className="p-2.5 xl:p-5">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           email
    //         </h5>
    //       </div>
    //       <div className="p-2.5 text-center xl:p-5">
    //         <h5 className="text-sm font-medium uppercase xsm:text-base">
    //           Ansewers
    //         </h5>
    //       </div>
    //     </div>
    //     <AddAnswer visible={visible} setVisible={setVisible} id={id.params.answer} />
    //     {data[0].contents && data[0].contents.map((brand, key) => (
    //       <div
    //         className="grid grid-cols-3  border-stroke dark:border-strokedark"
    //         key={key}
    //       >
    //         <div className="flex items-center gap-3 p-2.5 xl:p-5">

    //           <p className="hidden text-black dark:text-white sm:block">
    //             {brand.email || ""}
    //           </p>
    //         </div>

    //         <div className="flex items-center justify-center p-2.5 xl:p-5">
    //           <p className="text-black dark:text-white">{brand.answer || ""}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Answer;
