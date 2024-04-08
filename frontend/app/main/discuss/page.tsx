"use client";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import DropdownsOne from "@/components/Dropdowns/DropdownsOne";
import AddQuestion from "@/components/AddQuestion";
import { useState, useEffect } from "react";
import { getQues, createAnswer } from "@/services/Question";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { delQues } from "@/services/Question";
import { useRouter } from "next/navigation";
const Discuss: React.FC = () => {
  const [creation, setCreation] = useState(false);
  const auth = useSelector((state: any) => state.auth)
  const { questions } = useSelector((state: any) => state.question)
  console.log("questions", questions);
  console.log('auth', auth)
  const dispatch = useDispatch();
  const router = useRouter();
  const [popupOpen, setPopupOpen] = useState(false)
  useEffect(() => {
    getQues(dispatch);
  }, [dispatch]);
  const showAnswers = (id) => {
    router.push(`/main/${id}`)
  }
  const delQuestion = (id) => {
    delQues(dispatch, id)
  }

  return (
    <>
      <Breadcrumb pageName="Discuss" />

      <div className="col-span-12 xl:col-span-7">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 grid">
          <div className="mb-6 flex justify-between">
            <div>
              <h4 className="text-title-sm2 font-bold text-black dark:text-white">
                Questions
              </h4>
            </div>
            <button
              onClick={() => setPopupOpen(true)}
            >create
            </button>
            {/* <button></button> */}
          </div>


          <div
            className=""
          >
            {questions.map((element, key) => (
              <div className="mb-6 flex justify-between border-b" key={key}>
                <div className="flex items-center w-50 overflow-hidden " onClick={() => showAnswers(element.id)} >
                  <p className="hidden font-medium text-black dark:text-white sm:block ">{element.question}
                  </p>
                </div>
                <button onClick={() => delQuestion(element.id)}>del</button>
              </div>
            ))}

            {/* <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden font-medium text-black dark:text-white sm:block">Who are you?
              </p>
            </div> */}
            <AddQuestion popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Discuss;
