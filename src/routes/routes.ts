import express from 'express';
import sampleController from '../controllers/sample';
import dashboard from '../routes/dashboard';
import user from '../routes/user';
import portfolio from '../routes/portfolio';
import activity from '../routes/activity';


const router = express.Router();

router.get('/healthcheck', sampleController.sampleHealthCheck);
router.use('/dashboard', dashboard);
router.use('/user', user);
router.use('/portfolio', portfolio);
router.use('/activity', activity);




export = router;