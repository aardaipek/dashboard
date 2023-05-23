import express from 'express';
import { DashboardController } from '../controllers/dashboard.controller';

const router = express.Router();

router.post('/calculateCompoundInterest', new DashboardController().calculateCompoundInterest);
router.post('/createDashboard', new DashboardController().createDashboard);

export = router;