import { Schema, Types, model } from "mongoose"
import { iMemberData } from "../utils/interface";



const memberModel = new Schema<iMemberData>(
    {
   firstName: {
    type: String
   },
   middleName: {
    type: String
   },
   phoneNumber: {
    type: String
   },
   email: {
    type: String
   },
   relationship: {
    type: String
   },
   avatar: {
    type: String
   },
   avatarID: {
    type: String
   },
   
   status: {
    type: String
   },
   medicalHistory: [{
    type: Types.ObjectId,
    ref: "medicalHistory"
   }],
},
{timestamps: true}

);

export default model<iMemberData>("members", memberModel )

