import express, { Request, Response } from "express";
import cors from "cors";
const app = express()

app.use(cors());
app.set('view engine', 'ejs');

app.get("/", (req: Request, res: Response) => {
  res.render('index', {});
})

app.listen(8000,()=>{
  console.log('Server Started at Port, 8000')
})