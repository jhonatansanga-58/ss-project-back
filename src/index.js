import express from "express";
import userRoutes from './routes/user.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use(indexRoutes);

app.listen(3000);
console.log('Server 3000');