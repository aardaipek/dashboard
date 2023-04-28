import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/getUser', userController.getUser);
router.post('/createUser', userController.createUser);

export = router;