import express from 'express';
import dashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.post('/calculateCompoundInterest', dashboardController.calculateCompoundInterest);
router.post('/createDashboard', dashboardController.createDashboard);

export = router;