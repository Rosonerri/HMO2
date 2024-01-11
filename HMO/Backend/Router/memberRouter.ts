import { Router } from "express";
import { createMember, viewMyMember, loginMember, updateMemberInfo, updateMemberAvatar } from "../Controller/memberController";
import { upload } from "../utils/Multer";



const router: Router = Router()

router.route("/create-member/:userId").post(createMember)
router.route("/view-member/:userId").get(viewMyMember)
router.route("/login-member/:userId").post(loginMember)
router.route("/update-names/:memberId").patch(updateMemberInfo)
router.route("/member-avatar/:memberId").patch(upload, updateMemberAvatar)

export default router;
