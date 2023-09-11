import express from "express";
import bodyParser from "body-parser";
import { userRoutes, productRoutes, orderRoutes } from "./routes";

const app: express.Application = express();
const {
  ENV,
} = process.env;
const address: string = `localhost:${ENV === 'dev' ? 3005 : 3002}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(ENV === 'dev' ? 3005 : 3002, function () {
  console.log(`starting app on: ${address}`);
});

export default app;