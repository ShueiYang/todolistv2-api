

const addCustomList = async (req, res, List, defaultItems) => {
    
    const customListName = req.body.title
    const requestListName = customListName.charAt(0).toUpperCase() +
    customListName.slice(1).toLowerCase();

    const list = new List({
        name: requestListName,
        items: defaultItems
    })

    try {
        const saveList = await list.save(); 
        if(saveList === list) {
            res.status(201).json(`${requestListName} successfully created in the custom list`)
        } 
    } catch (err) {
      console.error(err)  
    }
};

module.exports = {
    addCustomList
}