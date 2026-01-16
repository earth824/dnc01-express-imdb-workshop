import express from 'express';
import { env } from './config/env.config.js';
import { error } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';
import { authRouter } from './routes/auth.route.js';
import { AUTH_ROUTES } from './config/route.config.js';

const app = express();

app.use(express.json());

app.use(AUTH_ROUTES.BASE, authRouter);

app.use(notFound);
app.use(error);

const port = env.PORT;
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log(`server running on port: ${port}`);
});
