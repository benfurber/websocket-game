import express, { Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express()
const port = process.env.PORT || 8000

app.use(cors());
app.set('view engine', 'ejs');

app.get("/", (req: Request, res: Response) => {
    res.render('index', {});
})

app.post("/game", (req: Request, res: Response) => {
  const id = "333"
  res.redirect(`/game/${id}`)
})

app.get("/game/:id", (req: Request, res: Response) => {
    const id = req.params.id
    res.render('game', {id});
})

const httpServer = createServer(app);
const io = new Server(httpServer, {});
let playersCount = 0;

io.on("connection", (socket: Socket) => {
  console.log("connection made")
  console.log(socket.id)
  playersCount += 1
  io.emit("playersCount", playersCount);

  socket.on("disconnect", (reason) => {
    console.log('disconnected')
      playersCount -= 1;
      io.emit("playersCount", playersCount);
  });
});


httpServer.listen(port, () => {
  console.log(`Server Started at port: ${port}`)
})