import mongoose from 'mongoose';

async function ConnectMongoDB() {
    try {
        const urlDB = process.env.URL_DATA_MONGODB 
        const connect = await mongoose.connect(urlDB)
        if(connect) {
            return `Connected MongoBD Successfully!`;
        }
    } catch (error) {
        return `Connect failed! Error: ${error}!`;
    }
}

export default ConnectMongoDB;
