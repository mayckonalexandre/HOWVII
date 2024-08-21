import express from "express";
import { mysqlConnections } from "./config/db";
import cors from "cors";
import morganBody from "morgan-body";
import { errorMiddleware } from "./middleware/error";
import { router } from "./route";
import env from "./config/env";

const app = express();

app.use(express.json());
app.use(cors());

morganBody(app);

app.use(router);

app.use(errorMiddleware);

(async () => {
  try {
    await mysqlConnections.init();
    app.listen(env.port, () => console.log(`Server Running ${env.port}!`));
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
    process.exit(1);
  }
})();
