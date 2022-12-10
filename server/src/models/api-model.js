
const mongoose = require('mongoose');
const { Schema } = mongoose;

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


module.exports = {
    Item,
    List,
    defaultItems,
}