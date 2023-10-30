import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server);
import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000);

let left1 = 0,
    left2 = 0;
const off = 10;
io.on('connection', (socket) => {
   // console.log('connected');

    if (left1 >= 200 || left2 >= 200) {
        left1 = 0;
        left2 = 0;
    }

    socket.emit('update', { left1, left2 });

    socket.on('move1', () => {
        //console.log('move1');
        left1 += off;
        io.emit('update', { left1, left2 });

        if (left1 >= 200 || left2 >= 200) {
            io.emit('over');
        }
    });

    socket.on('move2', () => {
        //console.log('move2');
        left2 += off;
        io.emit('update', { left1, left2 });

        if (left1 >= 200 || left2 >= 200) {
            io.emit('over');
        }
    });
});

// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
// NOTE THAT WE ARE LISTENING WITH server, NOT app!