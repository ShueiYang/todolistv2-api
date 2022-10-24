

const deleteCustomList = (req, res, List) => {
    
    const requestListName = req.body.title

    List.findOneAndDelete( {name: requestListName}, function(err) {
        if (!err) {
            List.find({},'name', function (err, listResult) {
                if(!err) {
                    res.json({
                        notification: `${requestListName} successfully deleted from the custom list`,
                        customListNames: listResult
                    })
                }
            })
        }
    })
};

module.exports = {
    deleteCustomList
}