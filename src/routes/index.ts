import { NextFunction, Request, Response, Router } from 'express';
import { ticketManager } from '@components/ticket';

// Export the base-router
const baseRouter = Router();
baseRouter.get('/get-ticket', (req: Request, res: Response, next: NextFunction) => {
    const ticketNum = ticketManager.getTicket();
    return res.status(200).json(ticketNum);
});

baseRouter.get('/call-next', (req: Request, res: Response, next: NextFunction) => {
    const ticketNum = ticketManager.callNext();
    return res.status(200).json(ticketNum);
})

export default baseRouter;
