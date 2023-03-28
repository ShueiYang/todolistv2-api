

const deleteCustomList = async (req, res, List) => {
    
    const requestListName = req.body.title

    try {
        const result = await List.findOneAndDelete( {name: requestListName});
        
        if(result) {
            const listResult = await List.find({}, 'name')
            res.json({
                notification: `${requestListName} successfully deleted from the custom list`,
                customListNames: listResult
            })
        }
    } catch (err) {
        console.error(err)
    }
}


module.exports = {
    deleteCustomList
}