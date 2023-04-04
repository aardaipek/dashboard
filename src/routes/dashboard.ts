import express from 'express';
import dashboardController from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/calculateCompoundInterest', dashboardController.calculateCompoundInterest);

export = router;