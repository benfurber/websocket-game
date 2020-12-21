import express, { Request, Response } from "express";
import cors from "cors";

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
  
app.listen(port, () => {
  console.log(`Server Started at port: ${port}`)
})