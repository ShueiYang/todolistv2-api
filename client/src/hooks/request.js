
async function httpAddItem (inputText, listTitle) {
    return await fetch('/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: inputText,
          value: listTitle
        })
      })
}


async function httpDeleteItem (checkboxValue, itemId) {
    const response = await fetch('/api', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          itemID: itemId,
          value: checkboxValue
        })
    })
    return await response.json();
}


async function httpCreateList (newListTitle) {
    const response = await fetch('/api/createlist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: newListTitle
        })
    })
    return await response.json();
}


async function httpDeleteList (selectList) {
    const response = await fetch('/api/deletelist',{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          title: selectList
        })
    })
    return await response.json();
}


export {
    httpAddItem,
    httpDeleteItem,
    httpCreateList,
    httpDeleteList
}