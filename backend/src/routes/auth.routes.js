import { Router } from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';
import { upload } from '../middlewares/multer.js';

const authRouter = Router();

authRouter.post('/signup', upload.single("profileImage"), signup);
authRouter.post('/signin', signin);
authRouter.post('/signout', signout);

export default authRouter