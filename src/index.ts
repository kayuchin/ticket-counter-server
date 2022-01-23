import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { Server, Socket } from 'socket.io';
import { joinChannel, socketHandler } from './component/counter';

// Start the server
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const onConnection = (socket: Socket) => {
    joinChannel(socket);
    socketHandler(socket, io);
}

io.on("connection", onConnection);