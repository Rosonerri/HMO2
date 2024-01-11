import { Application, Request, Response } from "express";
import user from "./Router/userRouter"
import member from "./Router/memberRouter"

export const mainApp = async (app:Application) =>{
try {
    app.use("/api", user)
    app.use("/api", member)
    app.get("/", (req:Request, res:Response) =>{
        try {
            return res.status(200).json({
                message: "Welcome to my Api"
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error While Loading Api"
            })
        }
    })
} catch (error) {
    return error
}
}