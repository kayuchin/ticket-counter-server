"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketManager = void 0;
const queue_1 = __importDefault(require("./queue"));
const ticketQ = new queue_1.default();
let ticketNum = 0;
exports.ticketManager = {
    getTicket: () => {
        ticketNum++;
        ticketQ.enqueue(ticketNum);
        return ticketNum;
    },
    callNext: () => {
        return ticketQ.dequeue();
    }
};
