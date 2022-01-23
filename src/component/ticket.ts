import Queue from "./queue";

const ticketQ: Queue = new Queue();
let ticketNum: number = 0;

export const ticketManager = {
    getTicket: () => {
        ticketNum++;
        ticketQ.enqueue(ticketNum);
        return ticketNum;
    },

    callNext: () => {
        return ticketQ.dequeue();
    }
}