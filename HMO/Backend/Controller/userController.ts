import { Response, Request } from "express"
import crypto from "crypto"
import userModel from "../model/userModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cloudinary from "../utils/Cloudinary"
dotenv.config()



export const createUser = async (req:Request, res:Response) =>{
try {
    const {email} = req.body
    const token = crypto.randomBytes(3).toString("hex")

    const user = await userModel.create({
        email,
        token,
        status: "main"
    })

    return res.status(200).json({
        message: "User created successfully",
        data: user
    })

} catch (error) {
    return res.status(404).json({
        message: "Error creating user"
    })
}
} 

export const signInUser = async (req:any, res:Response) =>{
    try {
        const {email, token } = req.body

        const getUser = await userModel.findOne({ email })

        if (getUser){
            if(getUser.token === token){
                if(getUser.verify){
                    const encrypt = jwt.sign( {id: getUser._id}, process.env.JWT_SECRET!, {expiresIn: "1d"});


                    req.session.isAuth = true;
                    req.session.userId = getUser._id;


                    return res.status(200).json({
                        message: "Welcome back",
                        data: encrypt 
                    });
                } else{
                    return res.status(404).json({
                        message: "Account hasn't been Verified",
                    });
                }
            } else {
                return res.status(404).json({
                    message: "Error Reading Token"
                });
            }
        } else{
            return res.status(404).json({
                message: "Error Reading User"
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}

export const verifyUSer = async (req:Request, res:Response) =>{
    try {
        const {userId} = req.params
    
        const user = await userModel.findById( userId )
        
        if  (user){
           const Updated =  await userModel.findByIdAndUpdate(userId, { verify: true }, { new: true })

            return res.status(200).json({
                message: "User Verified",
                data: Updated
            })
        }else{
            return res.status(404).json({
                message: "Something Went Wrong"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: "Error Verifying user" 
        })
    }
} 


export const logOutUser = async (req:any, res:Response) =>{
    try {
        req.session.destroy()
    
        return res.status(200).json({
            message: "User LoggedOut  successfully",
        })
    
    } catch (error) {
        return res.status(404).json({
            message: "Error creating user"
        })
    }
    } 


    //Profile Update


  
    export const updateUserNames = async (req:Request, res:Response) =>{
        try {
            const {userId} = req.params
            const {firstName, lastName, middleName} = req.body
            const user = await userModel.findById( userId )
            
            if  (user){
               const Updated =  await userModel.findByIdAndUpdate(userId, { firstName,  middleName, lastName}, { new: true })
    
                return res.status(200).json({
                    message: "User Info Updated",
                    data: Updated
                })
            }else{
                return res.status(404).json({
                    message: "Something Went Wrong"
                })
            }
    
        } catch (error) {
            return res.status(404).json({
                message: "Error Updating User"
            })
        }
    } 
    
    export const updateUserLocation  = async (req:Request, res:Response) =>{
        try {
            const {userId} = req.params
            const { location } = req.body
            const user = await userModel.findById({ userId })
            
            if  (user){
               const Updated =  await userModel.findByIdAndUpdate(userId, { location }, { new: true })
    
                return res.status(200).json({
                    message: "User LOcation Updated",
                    data: Updated
                })
            }else{
                return res.status(404).json({
                    message: "Something Went Wrong",
                })
            }
        
        } catch (error) {
            return res.status(404).json({
                message: "Error creating user"
            })
        }
    }   

    export const updateUserPhoneNumber = async (req:Request, res:Response) =>{
        try {
            const {userId} = req.params
            const { phoneNumber } = req.body
            const user = await userModel.findById({ userId })
            
            if  (user){
               const Updated =  await userModel.findByIdAndUpdate(userId, { phoneNumber }, { new: true })
    
                return res.status(200).json({
                    message: "User PhoneNumber Updated",
                    data: Updated
                })
            }else{
                return res.status(404).json({
                    message: "Something Went Wrong",
                })
            }
        
        } catch (error) {
            return res.status(404).json({
                message: "Error creating user"
            })
        }
    }   


    //Avatar Update


    export const updateUserAvatar = async (req:any, res:Response) =>{
        try {
            const {userId} = req.params
            const user = await userModel.findById( userId )
            
            if  (user){

                const  {secure_url, public_id} = await cloudinary.uploader.upload
                (req.file.path)
 
               const Updated =  await userModel.findByIdAndUpdate(
                userId, 
                { 
                    avatar: secure_url,
                    avatarID: public_id
                },
                 {
                     new: true
                 },
                )
    
                return res.status(200).json({
                    message: "Avatar Uploaded Successfully",
                    data: Updated
                })
            }else{
                return res.status(404).json({
                    message: "Something Went Wrong",
                })
            }
        
        } catch (error) {
            return res.status(404).json({
                message: "Error uploading Avatar"
            })
        }
    }   