import formidable from "express-formidable";
import express from "express"
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import { addProduct, addProductReview, fecthToProduct, fetchAllProducts, fetchNewProduct, fetchProductById, fetchProducts, filterProducts, removeProduct, updateProduct } from "../controller/productController.js";
import checkId from "../middleware/checkId.js";
const router = express.Router()

router.route("/").post(authenticate,authorizeAdmin,formidable(),addProduct)
.get(fetchProducts)
router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fecthToProduct);
router.get("/new", fetchNewProduct);
router.route("/:id").put(authenticate,authorizeAdmin,formidable(),updateProduct)
.get(fetchProductById)
.delete(authenticate,authorizeAdmin,removeProduct)


router.route("/filtered-products").post(filterProducts);

export default router

