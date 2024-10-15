import express from "express"
import {authenticate,authorizeAdmin} from "../middleware/authMiddleware.js"
import { createCategory, listOfCategory, readCategory, removeCategory, updateCategory } from "../controller/categoryController.js"
const router = express.Router()
router.route("/").post(authenticate,authorizeAdmin,createCategory)
router.route("/:categoryId").put(authenticate,authorizeAdmin,updateCategory)
.delete(authenticate,authorizeAdmin,removeCategory)

router.route("/categories").get(listOfCategory)
router.route("/:id").get(readCategory)


export default router