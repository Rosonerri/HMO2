import { connect } from "mongoose"


const URL: string = "mongodb://127.0.0.1:27017/HMO"
export const dbconfig = async () => {
    try {
       return await connect(URL).then(()=>{
        console.log("Database connection established🪐🌏🌎")
       })
       .catch(err => console.error());
       
    } catch (error) {
        return error
    }
}