import express from 'express';
import user from './user.routes';

const router = express.Router();
router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

router.use(user);

export default router;
