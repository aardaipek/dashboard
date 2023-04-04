import express from 'express';
import sampleController from '../controllers/sample';
import dashboard from '../routes/dashboard';

const router = express.Router();

router.get('/healthcheck', sampleController.sampleHealthCheck);
router.use('/dashboard', dashboard);

export = router;