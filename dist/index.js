"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
const _server_1 = __importDefault(require("@server"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const socket_io_1 = require("socket.io");
const counter_1 = require("@components/counter");
// Start the server
const port = Number(process.env.PORT || 3000);
const server = _server_1.default.listen(port, () => {
    Logger_1.default.info('Express server started on port: ' + port);
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
const onConnection = (socket) => {
    (0, counter_1.joinChannel)(socket);
    (0, counter_1.socketHandler)(socket, io);
};
io.on("connection", onConnection);
