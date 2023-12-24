import mongoose from "mongoose";

export const connect_DB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log("Connessione al DB riuscita");

    } catch (error) {

        console.log("ERRORE nella connessione al DB", error);
    }
};