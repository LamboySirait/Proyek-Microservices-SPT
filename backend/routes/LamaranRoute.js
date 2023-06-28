import express from "express";
import {
    getLamarans,
    getLamaranById,
    createLamaran,
    updateLamaran,
    deleteLamaran
} from "../controllers/Lamarans.js"

import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/lamarans', verifyUser, getLamarans)
router.get('/lamarans/:id', verifyUser, getLamaranById)
router.post('/lamarans', verifyUser, createLamaran)
router.patch('/lamarans/:id', verifyUser, updateLamaran)
router.delete('/lamarans/:id', verifyUser, deleteLamaran)

export default router;