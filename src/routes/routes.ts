import express from 'express';
import sampleController from '../controllers/sample';
import dashboard from '../routes/dashboard';
import user from '../routes/user';

const router = express.Router();

router.get('/healthcheck', sampleController.sampleHealthCheck);
router.use('/dashboard', dashboard);
router.use('/user', user);


export = router;