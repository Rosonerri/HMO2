import { Router } from "express";
import { createUser, signInUser, updateUserAvatar, updateUserLocation, updateUserNames, updateUserPhoneNumber, verifyUSer } from "../Controller/userController";
import { upload } from "../utils/Multer";

const router: Router = Router()
router.route("/register-user").post(createUser)
router.route("/verify-user/:userId").patch(verifyUSer)
router.route("/sign-in-user").post(signInUser)
router.route("/update-user-name/:userId").patch(updateUserNames)
router.route("/update-user-location").patch(updateUserLocation)
router.route("/update-user-phoneNumber").patch(updateUserPhoneNumber)
router.route("/update-user-avatar/:userId").patch(upload, updateUserAvatar)

export default router;