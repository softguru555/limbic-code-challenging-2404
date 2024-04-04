import React, { useState, useEffect} from 'react';
import { addQues } from '@/services/Question';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
interface AddQuestion {
  popupOpen: boolean;
  setPopupOpen: (open: boolean) => void;
}

const AddQuestion: React.FC<AddQuestion> = (props) => {
  const auth = useSelector((state:any)=> state.auth)
  
  const [formData, setFormData] = useState("")
  const dispatch = useDispatch();
  const addQuestion = () => {
    if(formData != ""){
      addQues(dispatch, formData, auth.email)
      setFormData("")
    }
  }
  const handleChange = (e) => {
    setFormData(e.target.value);
  }
  return (
    <div
      className={`fixed top-0 left-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 py-5 px-4 ${
        props.popupOpen === true ? 'block' : 'hidden'
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => props.setPopupOpen(false)}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <svg
            className="fill-current"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.8913 9.99599L19.5043 2.38635C20.032 1.85888 20.032 1.02306 19.5043 0.495589C18.9768 -0.0317329 18.141 -0.0317329 17.6135 0.495589L10.0001 8.10559L2.38673 0.495589C1.85917 -0.0317329 1.02343 -0.0317329 0.495873 0.495589C-0.0318274 1.02306 -0.0318274 1.85888 0.495873 2.38635L8.10887 9.99599L0.495873 17.6056C-0.0318274 18.1331 -0.0318274 18.9689 0.495873 19.4964C0.717307 19.7177 1.05898 19.9001 1.4413 19.9001C1.75372 19.9001 2.13282 19.7971 2.40606 19.4771L10.0001 11.8864L17.6135 19.4964C17.8349 19.7177 18.1766 19.9001 18.5589 19.9001C18.8724 19.9001 19.2531 19.7964 19.5265 19.4737C20.0319 18.9452 20.0245 18.1256 19.5043 17.6056L11.8913 9.99599Z"
              fill=""
            />
          </svg>
        </button>

        <form onSubmit={addQuestion}>
          <div className="mb-5">
            <label
              className="mb-2.5 block font-medium text-black dark:text-white"
            >
              Question
            </label>
            <input
              type="text"
              value={formData}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full rounded-sm border border-stroke bg-white py-3 px-4.5 focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:focus:border-primary"
            />
          </div>
          <button 
           className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2.5 px-4.5 font-medium text-white"
          >
            Add question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
