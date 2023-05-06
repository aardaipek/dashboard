import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/getUser', new UserController().getUser);
router.post('/createUser', new UserController().createUser);
router.post('/updateStatus', new UserController().updateStatus);


export = router;