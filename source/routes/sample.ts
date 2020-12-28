import express from 'express';
import { proceed } from '../middleware/proceed';
import controller from '../controllers/sample';

const router = express.Router();

router.get('/pub/proxy/bpm/start', proceed, controller.proxyStart);
router.get('/api/proxy/adu-ms/get', proceed, controller.proxyGet);
router.get('/save/:id', proceed, controller.readFileContent);
router.post('/save/:id', proceed, controller.writeFileContent);

export = router;
