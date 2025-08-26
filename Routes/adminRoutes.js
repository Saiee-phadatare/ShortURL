import { getAllUrls, Signin } from "../controllers/adminController.js";
import express from 'express';
import { verifyToken } from "../Middleware/verifyToken.js";

const router = express.Router();

router.post('/signin', Signin);
router.get('/adminpage', verifyToken, getAllUrls);

export default router;