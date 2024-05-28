import { Router, Request, Response } from 'express';
const router = Router();
// NOTE FOR AOI: THIS WILL WORK IF YOU LOG IN, THEN HIT THIS ENDPOINT. IT WILL NOT WORK IF THE SERVER BETWEEN LOG IN AND REQUEST TO .../SESSION. 
router.get('/session', (request: Request, response: Response) => {
  if (request.session && request.session.user) {
    const userForFrontend = {...request.session.user, password: ""}
    response.status(200).json(userForFrontend);
  } else {
    response.status(404).json({ error: 'No session data found' });
  }
});

export default router;