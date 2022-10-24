

const addCustomList = (req, res, List, defaultItems) => {
    
    const customListName = req.body.title
    const requestListName = customListName.charAt(0).toUpperCase() +
    customListName.slice(1).toLowerCase();

    const list = new List({
        name: requestListName,
        items: defaultItems
    })
    list.save(function (err) {
        if(!err) {
           res.json(`${requestListName} successfully created in the custom list`)
        }
    });
};

module.exports = {
    addCustomList
}