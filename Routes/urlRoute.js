import express from 'express';
import { handleShortUrl, getShortURL } from "../controllers/urlController.js";

const router = express.Router();

router.post('/api/shorten', handleShortUrl);
router.get('/:shortID', getShortURL);

export default router;

