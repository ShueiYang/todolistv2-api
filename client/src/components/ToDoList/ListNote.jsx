import React from "react";


const ListNote = ({list, homepage, deleteItem, listTitle}) => {
    
    return (
        <form>
            <div className="item">
                <input type="checkbox" 
                    value= {homepage? "Date" : listTitle}
                    onClick={event=> deleteItem(event, list._id)}
                />
                <p> {list.name} </p>
            </div>
        </form>
    )
}

export default ListNote;