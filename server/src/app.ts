//npm run dev to start app.ts :)

import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from './routes/sessionRoutes';
import DatabaseConnection from "./db/databaseConnection";
import dotenv from 'dotenv';
import session from "express-session";
import { IUser } from "./models/user";

dotenv.config();

const app: Application = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET as string, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.use('/users', userRoutes)
app.use('/', sessionRoutes)


declare module "express-session" {
    interface SessionData {
      user: IUser;
    }
  }

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
