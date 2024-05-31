import { Router, Request, Response } from 'express';
const router = Router();
// NOTE FOR AOI: THIS WILL WORK IF YOU LOG IN, THEN HIT THIS ENDPOINT. IT WILL NOT WORK IF THE SERVER BETWEEN LOG IN AND REQUEST TO .../SESSION. 
router.get('/session', (request: Request, response: Response) => {
    if (request.session && request.session.user) {
        const user = { ...request.session.user, password: "" }
        response.status(200).json({ isAuthenticated: true, user });
    } else {
        response.status(200).json({ isAuthenticated: false });
    }
});

router.post('/logout', (request: Request, response: Response) => {
    if (request.session) {
        console.log("logging out")
        request.session.destroy(error => {
            if (error) {
                return response.status(500).json({ error: 'Failed to destroy session' });
            }
            response.clearCookie('connect.sid', { path: '/' });
            response.status(200).json({ message: 'Logged out successfully' });

        });
    } else {
        response.status(200).json({ message: 'No session to destroy, user not logged in' });
    }
})


export default router;