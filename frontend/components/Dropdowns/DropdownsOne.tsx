import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import AddQuestion from '../AddQuestion';
const DropdownsOne: React.FC = () => {
  const [creation, setCreation] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  

  return (
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
      {creation && (
        <AddQuestion popupOpen={creation} setPopupOpen={setCreation} />
      )}
    </div>
  );
};

export default DropdownsOne;
