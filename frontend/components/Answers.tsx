import { useEffect, useRef, useState } from "react";
interface Answers {
  answer: Object;
}
const Answers = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [creation, setCreation] = useState(false)
  const [edition, setEdition] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const createQuestion = () => {
    setCreation(true);
  }


  return (
    <div className="no-scrollbar max-h-full space-y-3.5 overflow-auto px-6 py-7.5 top-1">
      {
        props.data.map((element, key) => (
          <div className="max-w-125" key={key}>
            <p className="mb-2.5 text-sm font-medium">Andri Thomas</p>
            <div className="mb-2.5 rounded-2xl rounded-tl-none bg-gray py-3 px-5 dark:bg-boxdark-2">
              <p>
                {element.answer}
              </p>
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default Answers;
