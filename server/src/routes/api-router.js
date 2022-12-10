
const express = require('express');
const apiRouter = express.Router();

const { getTodoList } = require('../controllers/getTodoList');
const { addItem } = require('../controllers/addItem');
const { deleteItem } = require('../controllers/deleteItem');
const { getCustomList } = require('../controllers/getCustomList');
const { addCustomList } = require('../controllers/addCustomList');
const { deleteCustomList } = require('../controllers/deleteCustomList');

const { Item } = require('../models/api-model');
const { List } = require('../models/api-model');
const { defaultItems } = require('../models/api-model');


apiRouter.route("/")
        
    .get((req, res) => {
        getTodoList(res, Item, defaultItems, List)
    })

    .post((req, res) => {
        addItem(req, res, Item, List)
    })

    .delete((req, res) => {
        deleteItem(req, res, Item, List)
    })

    
apiRouter.get("/:customListName?", (req, res) => {
    getCustomList(req, res, List)
 })    
            
apiRouter.post("/createlist", (req, res) => {
    addCustomList(req, res, List, defaultItems)
})
   
apiRouter.delete("/deletelist", (req, res) => {
    deleteCustomList(req, res, List)
}) 
       
module.exports = apiRouter;