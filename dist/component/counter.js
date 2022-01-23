"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketHandler = exports.joinChannel = void 0;
const Logger_1 = __importDefault(require("@shared/Logger"));
const CUSTOMER_CHANNEL = "customer";
const joinChannel = (socket) => {
    try {
        const query = socket.handshake.query.user;
        const user = Array.isArray(query) ? query[0] : query;
        if (typeof user !== "undefined" && user === CUSTOMER_CHANNEL) {
            socket.join(CUSTOMER_CHANNEL);
            Logger_1.default.info("Customer connected");
        }
        else {
            Logger_1.default.info("Counter Manager connected");
        }
    }
    catch (err) {
        Logger_1.default.err(err);
        socket.disconnect();
    }
};
exports.joinChannel = joinChannel;
const socketHandler = (socket, io) => {
    const callNext = (msg) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("callNext", msg);
    };
    const completeCurrent = (id) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("completeCurrent", id);
    };
    const goOffline = (id) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("goOffline", id);
    };
    const goOnline = (id) => {
        io.to(CUSTOMER_CHANNEL).volatile.emit("goOnline", id);
    };
    socket.on("callNext", callNext);
    socket.on("completeCurrent", completeCurrent);
    socket.on("goOffline", goOffline);
    socket.on("goOnline", goOnline);
};
exports.socketHandler = socketHandler;
