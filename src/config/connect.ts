// Libs
import mongoose from 'mongoose';

async function ConnectMongoDB() {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        const connect = await mongoose.connect(MONGO_URI);
        if(connect) {
            return `Connected MongoBD Successfully!`;
        }
    } catch (error) {
        return `Connect failed! Error: ${error}!`;
    }
}

export default ConnectMongoDB;
