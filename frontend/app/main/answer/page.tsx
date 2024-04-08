"use client"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
  );
};

export default Answer;
