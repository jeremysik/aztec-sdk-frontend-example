"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportServer = void 0;
/**
 * Keeps track of clients, providing a broadcast, and request/response api with multiplexing.
 */
class TransportServer {
    constructor(listener, msgHandlerFn) {
        this.listener = listener;
        this.msgHandlerFn = msgHandlerFn;
        this.sockets = [];
    }
    start() {
        this.listener.on('new_socket', client => this.handleNewSocket(client));
        this.listener.open();
    }
    stop() {
        this.listener.close();
        this.sockets.forEach(socket => socket.close());
    }
    async broadcast(msg) {
        await Promise.all(this.sockets.map(s => s.send({ payload: msg })));
    }
    handleNewSocket(socket) {
        socket.registerHandler(msg => this.handleSocketMessage(socket, msg));
        this.sockets.push(socket);
    }
    async handleSocketMessage(socket, { msgId, payload }) {
        try {
            const data = await this.msgHandlerFn(payload);
            const rep = { msgId, payload: data };
            await socket.send(rep);
        }
        catch (err) {
            const rep = { msgId, error: err.message };
            await socket.send(rep);
        }
    }
}
exports.TransportServer = TransportServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0X3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnQvdHJhbnNwb3J0X3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQTs7R0FFRztBQUNILE1BQWEsZUFBZTtJQUcxQixZQUFvQixRQUEyQixFQUFVLFlBQTRDO1FBQWpGLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWdDO1FBRjdGLFlBQU8sR0FBc0IsRUFBRSxDQUFDO0lBRWdFLENBQUM7SUFFekcsS0FBSztRQUNILElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQVk7UUFDMUIsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRU8sZUFBZSxDQUFDLE1BQXVCO1FBQzdDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUF1QixFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBMkI7UUFDcEcsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxNQUFNLEdBQUcsR0FBNkIsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO1lBQy9ELE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUFDLE9BQU8sR0FBUSxFQUFFO1lBQ2pCLE1BQU0sR0FBRyxHQUE2QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BFLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtJQUNILENBQUM7Q0FDRjtBQWxDRCwwQ0FrQ0MifQ==