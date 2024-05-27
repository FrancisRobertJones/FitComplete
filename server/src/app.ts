//npm run dev to start app.ts :)

import express, { Application } from "express";
import userRoutes from "./routes/User";
import DatabaseConnection from "./databaseClasses/databaseConnection";
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express()
const port = process.env.PORT || 3000;
console.log("hello world")

app.use(express.json())

/* app.use('/users', userRoutes)
 */

const db = DatabaseConnection.getInstance()
try {
    db.connect()
    console.log('Connected to db!')
} catch(error) {
    console.log('failed to connect', error)
}

app.listen(port, () => {
    console.log(`Server is up and runnning on ${port}`)
})