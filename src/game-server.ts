import { Server, Socket } from "socket.io";

import getCards from "./get-cards";

interface Data {
    playersCount: number;
    gameStarted: boolean;
}

const broadcastData: Data = {
    playersCount: 0,
    gameStarted: false,
}

let sockets: Set<Socket> = new Set()
let cardsPerPlayer = new Map()

export default function gameServer(server: any) {
    const io = new Server(server, {});
    function broadCastData() {
        broadcastData.playersCount = sockets.size
        io.emit('data', broadcastData)
        emitUpdatedCards()
    }

    function dealCards(cards: any[][]) {
        let i = 0
        sockets.forEach((socket: Socket) => {
            const cardsForPlayer = cards[i];
            console.log(socket.id, cardsForPlayer)
            cardsPerPlayer.set(socket.id, cardsForPlayer);
            socket.emit("cards", cardsForPlayer);
            i++;
        })
    }

    function emitUpdatedCards() {
        sockets.forEach((socket: Socket) => {
            socket.emit("cards", cardsPerPlayer.get(socket.id));
        })
    }

    io.on("connection", (socket: Socket) => {
        console.log(`New player connected: ${socket.id}`)
        sockets.add(socket)
        broadCastData()

        socket.on("disconnect", (reason) => {
            console.log(`Player disconnected: ${socket.id} (${reason})`)
            sockets.delete(socket) 
            broadCastData()
        });

        socket.on("startGame", (boolean) => {
            broadcastData.gameStarted = boolean
            console.log("gameStarted", broadcastData.gameStarted)
            const cards: any[][] = getCards(sockets.size)
            dealCards(cards)
            broadCastData()
        })
    });
}
