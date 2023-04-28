import { httpCreateList, httpDeleteList } from "./request";


function useCustomList(
  getCustomList,
  setNotification,
  serverUrl,
  gotoHomePage,
  setListName
) {
  async function createCustomList(newListTitle) {
    try {
      const message = await httpCreateList(newListTitle);
      setNotification(message);
      getCustomList(newListTitle);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCustomList(selectList) {
    try {
      const data = await httpDeleteList(selectList);
      setNotification(data.notification);
      if (serverUrl !== "/api") {
        gotoHomePage();
      } else {
        setListName(data.customListNames);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return {
    createCustomList,
    deleteCustomList,
  };
}

export default useCustomList;
