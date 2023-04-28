import React from "react";


const ListTitle = ({homepage, customListTitle}) => {
   
    const getDate = () => {
        
        const today = new Date();
            const options = {
                weekday: "long",
                day : "numeric",
                month: "long",
                year: "numeric"
            }  
        return today.toLocaleDateString("en-US", options);
    }

    return (
        <div className="head">
            <div id="icon">
                <div className="todoListIcon">
                    <img src="/icon.png" alt="icon"/>
                </div>
            </div>
            <div id="heading">
                {homepage ? 
                    <h1> {getDate()} </h1> 
                  : <h1> {customListTitle} </h1>
                }
            </div>
        </div>
    )
}

export default ListTitle;     
            