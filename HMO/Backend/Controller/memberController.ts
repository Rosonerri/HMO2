import { Request, Response } from "express";
import memberModel from "../model/membermodel";
import userModel from "../model/userModel";
import { Types } from "mongoose";
import cloudinary from "../utils/Cloudinary";

export const createMember = async (req:Request, res:Response)=>{
    try {
        const {userId} = req.params
        const {firstName, relationship} = req.body

        const getUser = await userModel.findById(userId)
        if(getUser){

            const user = await memberModel.create({
                firstName,
                status: "member",
                relationship
            });

            getUser.members.push(new Types.ObjectId(user._id))
            getUser.save()

            return res.status(200).json({
                message: "Member created Successfuly",
                data: user
            })
        }else{
            return res.status(404).json({
            message: "Error Occurred while Creating Member"
            })
        }
       
    } catch (error) {
        return res.status(404).json({
         message: "Error"
        })
    }
}


export const viewMyMember  =  async (req:Request, res:Response) =>{
    try{
        const {userId} = req.params
       
        const getUser = await userModel.findById(userId).populate({
            path: "members"
        });
        if(getUser){
            return res.status(200).json({
                message: "Member Loaded Succesfully",
                data: getUser
            })
        }else{
            return res.status(404).json({
                message: "Error Loading Members"
            })
        }

    }catch (error){
        return res.status(404).json({
            message: "Error"
        })
    }
}


export const loginMember  = async (req:Request, res:Response) =>{
    try{
        const {userId} = req.params 
        const {firstName, token} = req.body

        const getUser: any  = await userModel.findById(userId).populate({
            path: "members"
        })
          
    const getMember = getUser?.members.some((el: any) => el.firstName === firstName)

        if (getMember && getUser.token === token){
            return res.status(200).json({
                message: "Member Gotten Successfully",
                data: getUser
            })
        }else{
            return res.status(404).json({
                message: "Access Denied"
            })
        }
           }catch(error){
        return res.status(404).json({
            message: "Error"
        })
    }
}

//Update Member Info


export const updateMemberInfo = async (req: Request, res: Response) => {
    try{
        const {memberId} = req.params
        const {middleName, phoneNumber} = req.body
        const member: any  = await memberModel.findById(memberId)

        if (member){
            const updated = await memberModel.findByIdAndUpdate(memberId, { middleName, phoneNumber }, {new: true})
            return res.status(200).json({
                message: "Profile Updated Successfully",
                data: updated
            })
        }else{
            return res.status(404).json({
                message: "Error Occur While Updating Profile"
            })
        }
    }catch(error){
        return res.status(404).json({
            message: "Error"
        })
    }
}


//Update Member Avatar

export const updateMemberAvatar = async (req: any, res:Response) =>{
    try {
        const {memberId} = req.params
        const member  = await memberModel.findById(memberId)

        if (member){
            const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path)
            
            const updateAvatar = await memberModel.findByIdAndUpdate(memberId, {avatar: secure_url,  avatarID: public_id }, {new: true});

            return res.status(200).json({
                message: "Member Avatar Uploaded Successfully",
                data: updateAvatar
            })
        }else{
            return res.status(404).json({
                message: "Error Occured While Uploading Avatar"
            })
        }

    } catch (error) {
        return res.status(404).json({
            message: "Error"
        })
    }
}