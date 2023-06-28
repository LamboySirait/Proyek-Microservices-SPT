import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/Users.js"

import { verifyUser, adminOnly } from "../middleware/AuthUser.js"
// verifyUser : jika user ingin melakukan create, update, delete, get user, maka user harus login terlebih dahulu
// adminOnly : hanya menampilkan yang bisa ditampilkan/dilakukan oleh admin

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers)
router.get('/users/:id', verifyUser, adminOnly, getUserById)
router.post('/users', verifyUser, adminOnly, createUser)
router.patch('/users/:id', verifyUser, adminOnly, updateUser)
router.delete('/users/:id', verifyUser, adminOnly, deleteUser)

export default router;