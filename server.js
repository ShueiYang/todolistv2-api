require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const { getTodoList } = require('./controllers/getTodoList');
const { addItem } = require('./controllers/addItem');
const { deleteItem } = require('./controllers/deleteItem');
const { getCustomList } = require('./controllers/getCustomList');
const { addCustomList } = require('./controllers/addCustomList');
const { deleteCustomList } = require('./controllers/deleteCustomList');

const app = express();

app.use(express.json());
app.use(cors());

main().catch(err => console.log(err));

async function main() {
    const { Schema } = mongoose;
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);
        
        const itemsSchema = new Schema({
            name: {
                type: String,
                required: [true]
            }
        })
        const listSchema = new Schema({
            name: String,
            items: [itemsSchema]
        })

        const Item = mongoose.model("Item", itemsSchema);
        const List = mongoose.model("List", listSchema)

        const item1 = new Item({ name: "Welcome to your todoList!" });
        const item2 = new Item({ name: "Hit the + button to add a new item." });
        const item3 = new Item({ name: "<== Check this to delete an item." });

        const defaultItems = [item1, item2, item3]
                
        app.route("/")
        
            .get((req, res) => {
                getTodoList(res, Item, defaultItems, List)
            })

            .post((req, res) => {
                addItem(req, res, Item, List)
            })

            .delete((req, res) => {
                deleteItem(req, res, Item, List)
            })

        
        app.get("/lists/:customListName?", (req, res) => {
            getCustomList(req, res, List)
        })    
                
        app.post("/createlist", (req, res) => {
            addCustomList(req, res, List, defaultItems)
        })
       
        app.delete("/deletelist", (req, res) => {
            deleteCustomList(req, res, List)
        }) 
                
    
    } catch (err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080
}

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})