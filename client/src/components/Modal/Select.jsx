import React from "react";
import Form from 'react-bootstrap/Form';

const Select = ({customListName, handleOption}) => {


    return (
        <Form.Select onChange={handleOption} aria-label="Default select example">
            <option value={""}> Select list to delete </option>
            {customListName.map(list => (
                <option key={list._id} 
                        value={list.name}>
                    {list.name}
                </option> 
            ))}
        </Form.Select>
    );
}

export default Select;
            