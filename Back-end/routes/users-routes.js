import express from 'express'
import { SignIn, SignUp } from '../controllers/users-controllers.js';
import fileUpload from '../middleware/file-upload.js';

const router = express.Router()

router.post('/sign-up', fileUpload.single('image'), SignUp)
router.post('/sign-in', SignIn)

export default router