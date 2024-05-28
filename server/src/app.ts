//npm run dev to start app.ts :)

import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import healthRoute from "./routes/healthCheck";
import DatabaseConnection from "./db/databaseConnection";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/users', userRoutes)
app.use('/health', healthRoute)

const startServer = async () => {
    const db = DatabaseConnection.getInstance();
    try {
        await db.connect();
        console.log('Connected to db!');
        app.listen(port, () => {
            console.log(`Server is up and running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database', error);
      
    }
};

startServer();
