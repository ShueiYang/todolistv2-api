const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
    console.error(err);
});


async function startServer() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_AUTHENTIFICATION}`);
        
    } catch (err) {
        console.log(`Process failed... ${err}`);
        process.exit(1)
    }
};

async function endServer() {
    await mongoose.disconnect();  
};

module.exports = {startServer, endServer};