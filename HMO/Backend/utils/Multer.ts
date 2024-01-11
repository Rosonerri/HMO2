import multer from "multer"
import { Request } from "express"

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ storage: storage }).single("avatar")