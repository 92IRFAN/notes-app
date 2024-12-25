import express from 'express';
import { CreateNote, GetNotes, DeleteNote, GetSingleNote, UpdateNote, InWishlist } from '../controllers/notes-controllers.js';
import { VerifyToken } from '../middleware/authMiddleware.js';
import fileUpload from '../middleware/file-upload.js';

const router = express.Router();

router.get('/get-all-notes/:userId', VerifyToken, GetNotes);

router.get('/get-single-note/:id', VerifyToken, GetSingleNote);

router.post('/create-note', VerifyToken, fileUpload.single('image'), CreateNote);

router.delete('/delete-note', VerifyToken, DeleteNote);

router.put('/update-note/:id', VerifyToken, fileUpload.single('image'), UpdateNote);

router.patch("/toggle-wishlist/:id", VerifyToken, InWishlist)

export default router;
