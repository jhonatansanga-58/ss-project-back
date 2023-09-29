import express from "express";
import userRoutes from './routes/user.routes.js'
import indexRoutes from './routes/index.routes.js'
import eventRoutes from './routes/event.routes.js'

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/event', eventRoutes);
app.use('/ping', indexRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
});

export default app;