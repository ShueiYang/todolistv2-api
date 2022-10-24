

const addItem =  (req, res, Item, List) => {
    const itemName = req.body.input
    const customListName = req.body.value
    
    const item = new Item({ name: itemName })

    if (customListName === "Date") {
        item.save(function (err) {
            if (err) {
                console.log(`ERROR NO NAME: ${err}`)
                res.status(400).json("Please provide a name to add on the list");
            } else {
                res.redirect("/");
            }
        });
    } else {
        List.findOne({ name: customListName }, function (err, foundList) {
            if (!err) {
                foundList.items.push(item)
                foundList.save(function (err) {
                    if (err) {
                        console.log(`ERROR NO NAME: ${err}`)
                        res.status(400).json("Please provide a name to add on the list");
                    } else {
                        res.redirect(`/lists/${customListName}`);
                    } 
                });
            }
        })
    }
};

module.exports = {
    addItem
}         
    