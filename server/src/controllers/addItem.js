

const addItem =  async (req, res, Item, List) => {
    const itemName = req.body.input
    const customListName = req.body.value
    
    const item = new Item({ name: itemName })
        try {
            if (customListName === "Date") {
                
                const saveItem = await item.save();
                if(saveItem === item) {
                    res.redirect("/api"); 
                } 
            } else {
                const foundList = await List.findOne({ name: customListName }) 
                    
                if(foundList) {
                    foundList.items.push(item);
                    const saveFoundList = await foundList.save();
                    
                    if(saveFoundList === foundList) {
                        res.redirect(`/api/${customListName}`);
                    } 
                }    
            }
        } catch (err) {
            console.error(`ERROR NO NAME: ${err}`)
            res.status(400).json("Please provide a name to add on the list"); 
        }
}  

module.exports = {
    addItem
}         
    