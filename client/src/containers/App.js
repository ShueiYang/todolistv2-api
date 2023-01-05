import React, { useEffect, useState } from "react";
import Header from '../components/Header';
import ListTitle from '../components/ListTitle';
import ToDoList from '../components/ToDoList';
import Footer from '../components/Footer';
import AlertMessage from "../components/Alert";
import ModalNotification from "../components/Modal/Modal";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "../errorboundary/ErrorFallback";
import './App.css';

import { httpAddItem, httpCreateList, httpDeleteItem, httpDeleteList } from "../hooks/request";


function App() {
  
  const [todoList, setTodoList] = useState([]);
  const [listName, setListName] = useState([]);
  const [customList, setCustomList] = useState([]);
  const [listTitle, setListTitle] = useState();
  const [inputText, setInputText] = useState("");
  const [serverUrl, setServerUrl] = useState("/api");
  const [home, setHome] = useState(true);
  const [notification, setNotification] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [errorSearch, setErrorSearch] = useState(null);
  
  useEffect(() => { 
    const controller = new AbortController();
    const { signal } = controller;
    
    const getToDoList = async () => {
      try { 
        const response = await fetch(serverUrl, {signal})
        const data = await response.json();
        if(response.ok) {
          if (serverUrl === "/api") {
            setTodoList(data.mainData);
            setListName(data.customListNames)
          } else {
            setListTitle(data.customList.name)
            setCustomList(data.customList.items)
            setListName(data.customListNames)
            setSearch("")
          }
        } else if (response.status === 404) {
          setHome(true)
          setNewTitle(data)
          setServerUrl("/api")
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Request cancelled!');
        } else {
          console.log(`Error: ${err}`)
        }
      } 
    }
    getToDoList();

    return () => {
      controller.abort();
    }
  }, [serverUrl])
   
  
  const handleChange = (event) => {
    setInputText(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  const handleModal = () => {
    setDeleteModal("Delete custom list")
  }
  const closeAlert = () => {
    setError(null);
    setNotification(null)
    setErrorSearch(null);
  }
  const closeModal = () => {
    setNewTitle(null)
    setDeleteModal(null);
  }
  
  const gotoHomePage = () => {
      setHome(true);
      setServerUrl('/api');
  }

  const getCustomList = (listName) => {
    if (listName === "") {
      setErrorSearch("Please provide a name to access")
    } else {
      setHome(false)
      setServerUrl(`/api/${listName}`) 
    }
  }
      
  const addItem = async (event) => {
    event.preventDefault();
    const buttonClick = event.target.value;
    try {
      const response = await httpAddItem(inputText, buttonClick);
      const data = await response.json();
      if(response.ok) {
        if(buttonClick==="Date") {
          setTodoList(data.mainData);
        } else {
          setCustomList(data.customList.items)
        }
      } else if (response.status === 400) {
        setError(data);
      }
    } catch (err) {
      console.log(err)
    } finally {
      setInputText("");
    }
  }

  const deleteItem = async (event, itemId) => {
    const checkBoxClick = event.target.value;
    try {
      const data = await httpDeleteItem(checkBoxClick, itemId)  
        if(checkBoxClick==="Date") {
          setTodoList(data.mainData)
        } else {
          setCustomList(data.customList.items)
        }
      } catch (err) {
        console.log(err)
      } 
  }

  const createCustomList = async (newListTitle) => {
    try {
      const message = await httpCreateList(newListTitle)
      setNotification(message)
      getCustomList(newListTitle);
    } catch (err) {
      console.log(err)
    }
  }
  
  const deleteCustomList = async (selectList) => {
    try{
      const data = await httpDeleteList(selectList)
      setNotification(data.notification)
      if (serverUrl !== "/api") {
        gotoHomePage(); 
      } else {
        setListName(data.customListNames)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={()=>{window.location.reload(false)}}>
      <Header 
        gotoHomePage={gotoHomePage}
        customListName={listName}
        getCustomList={getCustomList}
        handleChange={handleSearch}
        searchInput={search} 
        deleteMenu={handleModal}     
      />
      <ModalNotification 
        handleClose={closeModal}
        newTitle={newTitle}
        createList={createCustomList}
        deleteMenu={handleModal}
        deleteModal={deleteModal}
        listName={listName}
        deleteList={deleteCustomList}
      />
      <div id="successAlert">
        <AlertMessage notification={notification} errorSearch={errorSearch} close={closeAlert}/>
      </div>  
      
      <ListTitle homepage={home} customListTitle={listTitle}/>

      <div className="box">
        <ToDoList 
          listItems={home ? todoList : customList}
          listTitle={listTitle}
          homepage={home}
          deleteItem={deleteItem}
        />
        <form className="item">
          <input type="text" 
            placeholder="Add new item here"
            autoComplete="off"
            onChange={handleChange}
            value={inputText}
          />
          <button value={home ? "Date": listTitle} onClick={addItem}> + </button>
        </form>
        <AlertMessage error={error} close={closeAlert}/>
      </div>
      <Footer />
      </ErrorBoundary>  
    </>
  );
}

export default App;