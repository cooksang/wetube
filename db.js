import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    userNewUrlParse: true,
    useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB");
const handleError = () => console.log(`X Error on DB Connection:`);
db.once("open", handleOpen);
db.on("error", handleError);