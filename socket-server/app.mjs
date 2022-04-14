import express from 'express'
import morgan from 'morgan'

const app = express();

console.log("process.env")
console.log(process.env)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
