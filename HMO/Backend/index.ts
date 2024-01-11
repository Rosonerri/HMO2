import express, {Application} from "express"
import cors from "cors"
import dotenv from "dotenv";
import { mainApp } from "./mainApp";
import { dbconfig } from "./utils/dbConfig";
import session from "express-session";
dotenv.config()

const app:Application = express()
const Port: number = parseInt(process.env.PORT!)

app.use(cors())
app.use(express.json())

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 24 * 60,
            sameSite: "lax",
            secure: false,
        }
    })
)

mainApp(app)
const server = app.listen(Port, () =>{
    console.clear()
    console.log("App Listenng to port", Port)
    console.log()
    dbconfig()
})

process.on("uncaughtException", (error: Error) =>{
    console.log("uncaughtException", error);

    process.exit(1)
});

process.on("unhandledRejection", (reason: any) =>{
    console.log("unhandledRejection", reason);

    server.close(() =>{
        process.exit(1)
    });
});