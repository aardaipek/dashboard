import express from 'express';
import portfolioController from '../controllers/portfolio.controller';

const router = express.Router();

router.post('/createPortfolio', portfolioController.createPortfolio);
router.post('/getPortfolio', portfolioController.getPortfolio);
router.post('/getHoldings', portfolioController.getHoldings);

export = router;