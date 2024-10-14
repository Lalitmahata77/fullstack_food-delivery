import express from "express";
import { createUser, deleteUserById,getAllUsers, getUserById, getUserDetails, login, logout, updateCurrentUserProfile, updateUserById } from "../controller/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js"
const router = express.Router()

router.route("/").post(createUser)
.get(authenticate, authorizeAdmin,getAllUsers)
router.route("/login").post(login)
router.route("/logout").post(authenticate,logout)
router.route("/profile").get(authenticate,getUserDetails)
.put(authenticate,updateCurrentUserProfile)
router.route("/:id")
.delete(authenticate, authorizeAdmin, deleteUserById)
.get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router