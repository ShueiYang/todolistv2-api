import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from "./Select";


const ModalNotification = ({newTitle, deleteModal, listName, handleClose, deleteMenu, createList, deleteList}) => {

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [selectOption, setSelectOption ] = useState("");
    const [validation, setValidation] = useState(null);
    
    useEffect(()=> {
        if (newTitle) {
            setShowModal(true)
            setModalContent({
                title: 'List not found',
                text: `${newTitle} does not exist, do you want to create a new one ?`,
            })
        } else if (deleteModal) {
            setShowModal(true)
            setModalContent({
                title: deleteModal  
            })
        } else if (validation) {
            setTimeout(()=> {
                setShowModal2(true)
            }, 400)
        }
    },[newTitle, deleteModal, validation]);    
    
    
    function closeModal () {
        setShowModal(false)
        setSelectOption("")
        handleClose(); 
    }
    function closeModal2 () {
        setShowModal2(false)
        setValidation(null);
    }
    function create (title) {
        createList(title)
        closeModal();
    }
    function selectDelete () {
        setValidation(selectOption)
        closeModal();
    }
    function goBackToSelectList () {
        setTimeout(()=> {deleteMenu()}, 400)
        closeModal2();
    }
    function deleteValidation (selectList) {
        deleteList(selectList)
        closeModal2();
    }

    return (
        // First Modal component 
        <>     
        <Modal
            show={showModal}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{modalContent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            { deleteModal ? 
                <Select customListName={listName}
                        handleOption={(e)=>{setSelectOption(e.target.value)}}
                />
              : <p>{modalContent.text}</p>
            }
            </Modal.Body>
            <Modal.Footer>
            { newTitle &&
             <>
                <Button variant="primary" onClick={closeModal} >Cancel</Button>
                <Button className="my-btn" onClick={()=>{create(newTitle)}} >Create new list</Button>
             </> 
            }
            { deleteModal &&
             <>
                <Button variant="primary" onClick={closeModal} >Cancel</Button>
                <Button variant="danger" 
                        disabled={selectOption==="" ? true : false}
                        onClick={()=>{selectDelete()}}>
                    Delete
                </Button>
             </> 
            }    
            </Modal.Footer>
        </Modal>
        
    {/* // Second Modal component */}
        <Modal
            show={showModal2}
            onHide={closeModal2}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{`Are you sure you want to delete ${validation} ?`}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" 
                        onClick={()=>{goBackToSelectList()}}> 
                    Back to select list 
                </Button>
                <Button variant="danger" 
                        onClick={()=>{deleteValidation(validation)}}>
                    Confirm Delete
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default ModalNotification; 