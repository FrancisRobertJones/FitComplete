import { Router, Request, Response } from 'express';
const router = Router();
// NOTE FOR AOI: THIS WILL WORK IF YOU LOG IN, THEN HIT THIS ENDPOINT. IT WILL NOT WORK IF THE SERVER BETWEEN LOG IN AND REQUEST TO .../SESSION. 
router.get('/session', (request: Request, response: Response) => {
    if (request.session && request.session.user) {
        const userForFrontend = { ...request.session.user, password: "" }
        response.status(200).json(userForFrontend);
    } else {
        response.status(404).json({ error: 'No session data found' });
    }
});

router.post('/logout', (request: Request, response: Response) => {
    if (request.session) {
        request.session.destroy(error => {
            if (error) {
                return response.status(500).json({ error: 'Failed to destroy session' });
            }
            response.status(200).json({ message: 'Logged out successfully' });
        });
    } else {
        response.status(200).json({ message: 'No session to destroy, user not logged in' });
    }
})

export default router;