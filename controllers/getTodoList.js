

const getToDoList = async (res, Item, defaultItems, List) => {
    
    try {
        const itemsListResult = await Item.find({})
        
        if (itemsListResult.length === 0) {
            await Item.insertMany(defaultItems)
            res.redirect("/")
        } else {
            const listResult = await List.find({},'name').exec();
            
            res.json({
                mainData: itemsListResult,
                customListNames : listResult
            })
        }
    } catch (err) {
        console.log(`Error: ${err}`)
    }
};

module.exports = {
    getToDoList
}