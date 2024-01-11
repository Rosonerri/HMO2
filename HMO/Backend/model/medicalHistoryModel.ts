import { Schema, Types, model } from "mongoose"
import { iMedicalData } from "../utils/interface";



const medicalHistoriesModel = new Schema<iMedicalData>(
    {
   doctorName: {
    type: String
   },
   hospitalName: {
    type: String
   },
   diagnosis: {
    type: String
   },
   status: {
    type: String
   },
   member: [{
    type: Types.ObjectId,
    ref: "members"
   }],

},
{timestamps: true}

);

export default model<iMedicalData>("medicalHistories", medicalHistoriesModel )

