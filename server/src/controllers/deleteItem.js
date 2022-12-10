

const deleteItem = (req, res, Item, List) => {
    
    const itemId = req.body.itemID
    const customListName = req.body.value
    
    if (customListName === "Date") {
        Item.findByIdAndDelete(itemId, function (err) {
            if (!err) {
                res.redirect(303, "/api");
            }
        });
    } else {
        List.findOneAndUpdate(
            { name: customListName },
            { $pull: { items: { _id: itemId } } },
            function (err) {
                if (!err) {
                    res.redirect(303, `/api/${customListName}`);
                }
            }
        )
    }
};

module.exports = {
    deleteItem
}   