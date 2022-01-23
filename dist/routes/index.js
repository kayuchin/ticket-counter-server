"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticket_1 = require("@components/ticket");
// Export the base-router
const baseRouter = (0, express_1.Router)();
baseRouter.get('/get-ticket', (req, res, next) => {
    const ticketNum = ticket_1.ticketManager.getTicket();
    return res.status(200).json(ticketNum);
});
baseRouter.get('/call-next', (req, res, next) => {
    const ticketNum = ticket_1.ticketManager.callNext();
    return res.status(200).json(ticketNum);
});
exports.default = baseRouter;
