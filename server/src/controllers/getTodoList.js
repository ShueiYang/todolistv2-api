

const getTodoList = async (res, Item, defaultItems, List) => {
    
    try {
        const itemsListResult = await Item.find({})
        
        if (itemsListResult.length === 0) {
            await Item.insertMany(defaultItems)
            res.redirect("/api")
        } else {
            const listResult = await List.find({},'name').exec();
            
            res.json({
                mainData: itemsListResult,
                customListNames : listResult
            })
        }
    } catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json("Internal Server Error");
    }
};

module.exports = {
    getTodoList
}