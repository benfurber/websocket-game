import { Server, Socket } from "socket.io";

const data = {
    playersCount: 0,
    gameStarted: false,
}

export default function gameServer(server: any) {
    const io = new Server(server, {});
    function emitUpdatedData() { io.emit("data", data); }

    io.on("connection", (socket: Socket) => {
        console.log("connection made")
        console.log(socket.id)
        data.playersCount += 1
        emitUpdatedData()

        socket.on("disconnect", (reason) => {
            console.log('disconnected')
            data.playersCount -= 1;
            emitUpdatedData()
        });

        socket.on("startGame", (boolean) => {
            data.gameStarted = boolean
            console.log("gameStarted", data.gameStarted)
            emitUpdatedData()
        })
    });
}
