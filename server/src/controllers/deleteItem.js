

const deleteItem = async (req, res, Item, List) => {
    
    const itemId = req.body.itemID
    const customListName = req.body.value
    
    try {
        if (customListName === "Date") {
            const result = await Item.findByIdAndDelete(itemId)   
            if(result) {
                res.redirect(303, "/api");
            }
        } else {
            const itemFound = await List.findOneAndUpdate(
                { name: customListName },
                { $pull: { items: { _id: itemId } } },
            )
            await itemFound.save();
            if(itemFound) {
               res.redirect(303, `/api/${customListName}`); 
            }
        }
    } catch (err) {
        console.error(err)
    }
}    

module.exports = {
    deleteItem
}   