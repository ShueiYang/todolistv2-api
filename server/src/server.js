require('dotenv').config();
const path = require('path');
const express = require("express");
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const apiRouter = require('./routes/api-router');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public',)));
app.use('/api', apiRouter);


async function startServer() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);
        
    } catch (err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
}

mongoose.connection.once('open', () => {
    console.log("MongoDB connection ready!");
})
mongoose.connection.on('error', (err) => {
    console.error(err);
})    
     

const PORT = process.env.PORT || 8080;

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}...`)
    });  
}).catch(err => console.log(err));
