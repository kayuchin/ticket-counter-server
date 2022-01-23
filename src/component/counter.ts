import logger from "@shared/Logger";
import { Server, Socket } from "socket.io";

const CUSTOMER_CHANNEL = "customer";

interface CallNextMsg {
    counterId: number;
    curNum: number;
}

export const joinChannel = (socket: Socket) => {
    try {
        const query = socket.handshake.query.user;
        const user = Array.isArray(query) ? query[0] : query;
    
        if (typeof user !== "undefined" && user === CUSTOMER_CHANNEL) {
            socket.join(CUSTOMER_CHANNEL);
            logger.info("Customer connected");
        }
        else {
            logger.info("Counter Manager connected");
        }
    }
    catch (err) {
        logger.err(err);
        socket.disconnect();
    }
};

export const socketHandler = (socket: Socket, io: Server) => {

    const callNext = (msg: CallNextMsg) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("callNext", msg);
    }

    const completeCurrent = (id: number) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("completeCurrent", id);
    }

    const goOffline = (id: number) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("goOffline", id);
    };

    const goOnline = (id: number) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("goOnline", id);
    };

    socket.on("callNext", callNext);
    socket.on("completeCurrent", completeCurrent);
    socket.on("goOffline", goOffline);
    socket.on("goOnline", goOnline);
}