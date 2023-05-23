import express from 'express';
import { ActivityController } from '../controllers/activity.controller';

const router = express.Router();

router.post('/addActivity', new ActivityController().addActivity);
router.post('/getActivities', new ActivityController().getActivities);


export = router;