import mongoose from "mongoose";

export const connect_DB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log(" - Connessione al DataBase riuscita");

    } catch (error: any) {

        console.log(" - ERRORE: si è verificato un problema nella connessione al DataBase --> ", error.message);
    }
};