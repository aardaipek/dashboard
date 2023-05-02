import express from 'express';
import activityController from '../controllers/activity.controller';

const router = express.Router();

router.post('/addActivity', activityController.addActivity);
router.post('/getActivities', activityController.getActivities);


export = router;