import { useState } from "react";
import { httpAddItem } from "./request";

function useAddItem(setTodoList, setCustomList) {
  
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);


  async function addItem(event) {
    event.preventDefault();
    const buttonClick = event.target.value;
    try {
      const response = await httpAddItem(inputText, buttonClick);
      const data = await response.json();
      if (response.ok) {
        if (buttonClick === "Date") {
          setTodoList(data.mainData);
        } else {
          setCustomList(data.customList.items);
        }
      } else if (response.status === 400) {
        setError(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setInputText("");
    }
  }

  return {
    addItem,
    setInputText,
    inputText,
    error,
    setError,
  };
}

export default useAddItem;
