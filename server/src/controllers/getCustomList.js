

const getCustomList = async (req, res, List) => {
    
    const { customListName } = req.params;
    try {
        const requestListName = customListName.charAt(0).toUpperCase() +
        customListName.slice(1).toLowerCase();
        
        const result = await List.findOne({ name: requestListName }).exec();
        if (result) {
            const listResult = await List.find({},'name').exec();
            res.json({
                customList: result,
                customListNames: listResult
            });
        } else {
            res.status(404).json(`${requestListName}`)
        } 
    } catch (err) {
        console.log(`Error: ${err}`)
        res.status(500).json("Internal Server Error");
    }
};

module.exports = {
    getCustomList
}