//npm run dev to start app.ts :)

import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from './routes/sessionRoutes';
import DatabaseConnection from "./db/databaseConnection";
import dotenv from 'dotenv';
import session from "express-session";
import { IUser } from "./models/user";
import contentRoutes from "./routes/contentRoutes";
import cors from 'cors'

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

  const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use('/users', userRoutes)
app.use('/', sessionRoutes)
app.use('/content', contentRoutes)

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
