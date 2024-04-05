"use client";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DropdownDefault from "@/components/Dropdowns/DropdownDefault";
import DropdownsOne from "@/components/Dropdowns/DropdownsOne";
import AddQuestion from "@/components/AddQuestion";
import { useState, useEffect } from "react";
import { getQues, createAnswer } from "@/services/Question";
import { useDispatch, useSelector } from "react-redux";
import Answers from "@/components/Answers";
import { toast } from "react-toastify";
const Discuss: React.FC = () => {
  const [creation, setCreation] = useState(false);
  const auth = useSelector((state: any) => state.auth)
  console.log('auth', auth)
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState([]);
  const [content, setContent] = useState("")
  const [id, setId] = useState("")
  const addAnswer = () => {
    if (id == '') {
      return toast.success("Please select the question")
    }
    createAnswer(dispatch, content, auth.email, id);
    setContent("");
  }
  useEffect(() => {
    getQues(dispatch);
  }, [dispatch]);
  console.log("id", id);
  const handleData = (object) => {
    setAnswer(object.content || []);
    setId(object.id)
  }
  const { questions } = useSelector((state: any) => state.question)
  console.log("questions", questions);
  return (
    <>
      <Breadcrumb pageName="Discuss" />

      <div className="h-[calc(100vh-186px)] overflow-hidden sm:h-[calc(100vh-174px)]">
        <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
          <div className="hidden h-full flex-col xl:flex xl:w-1/4">
            {/* <!-- ====== Chat List Start --> */}
            <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
                All questions
                <span className="rounded-md border-[.5px] border-stroke bg-gray-2 py-0.5 px-2 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
                  {questions.length}
                </span>
              </h3>
            </div>
            <div className="flex max-h-full flex-col overflow-auto p-5">

              <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
                {/* <!-- Chat List Item --> */}
                {questions.map((object, item) => {
                  return (
                    <div
                      key={item}
                      className="flex cursor-pointer items-center rounded py-2 px-4 hover:bg-gray-2 dark:hover:bg-strokedark"
                    >
                      <div className="w-full">
                        <button className="text-sm font-medium text-black dark:text-white"
                          onClick={() => handleData(object)}
                        >
                          {object.question}
                        </button>
                        <p className="text-sm">{object.message}</p>
                      </div>
                    </div>
                  );
                })}
                {/* <!-- Chat List Item --> */}
              </div>
            </div>
            {/* <!-- ====== Chat List End --> */}
          </div>
          <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4">
            {/* <!-- ====== Chat Box Start --> */}
            <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
              <div className="flex items-center">
                <div className="mr-4.5 h-13 w-full max-w-13 overflow-hidden rounded-full">
                  <Image
                    src={"/images/user/user-01.png"}
                    alt="avatar"
                    className="h-full w-full object-cover object-center"
                    width={52}
                    height={52}
                  />
                </div>
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    Henry Dholi
                  </h5>
                  <p className="text-sm">Reply to message</p>
                </div>
              </div>
              <div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <button
                    className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                    onClick={() => setCreation(true)}
                  >
                    create
                  </button>
                  <button
                    className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                  >
                    delete
                  </button>
                  <button
                    className="py-1 px-2 font-medium text-black hover:bg-primary hover:text-white  dark:text-white sm:py-3 sm:px-6"
                  >
                    edit
                  </button>
                  <AddQuestion popupOpen={creation} setPopupOpen={setCreation} />
                </div>
              </div>
            </div>
            <div className="h-100">
              <Answers data={answer} />
            </div>

            <div className="sticky bottom-2 border-t border-stroke bg-white py-5 px-6 dark:border-strokedark dark:bg-boxdark">
              <form className="flex items-center justify-between">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Type something here"
                    className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <button className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90"
                  onClick={addAnswer}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 2L11 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 2L15 22L11 13L2 9L22 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
            {/* <!-- ====== Chat Box End --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Discuss;
