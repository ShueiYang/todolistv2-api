import React from "react";
import ListNote from "./ListNote";



const ToDoList = ({listItems, homepage, deleteItem, listTitle}) => {

  return (
        
      <div>
          {listItems.map(item => {
              return (
                <ListNote 
                  key= {item._id}
                  homepage= {homepage}
                  deleteItem={deleteItem}
                  list= {item}
                  listTitle={listTitle}
                  />   
              )
            })
          }
      </div>
  )
}

export default ToDoList;