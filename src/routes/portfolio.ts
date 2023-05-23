import express from 'express';
import { PortfolioController } from '../controllers/portfolio.controller';

const router = express.Router();

router.post('/createPortfolio', new PortfolioController().createPortfolio);
router.post('/getPortfolio', new PortfolioController().getPortfolio);

export = router;