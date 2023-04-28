import { httpDeleteItem } from "./request";


function useDeleteItem(setTodoList, setCustomList) {

    async function deleteItem (event, itemId) {
        const checkBoxClick = event.target.value;
        try {
          const data = await httpDeleteItem(checkBoxClick, itemId)  
            if(checkBoxClick==="Date") {
              setTodoList(data.mainData)
            } else {
              setCustomList(data.customList.items)
            }
          } catch (err) {
            console.error(err)
          } 
      };

      return {
        deleteItem
      }
}

export default useDeleteItem;