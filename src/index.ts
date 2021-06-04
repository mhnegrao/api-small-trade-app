import express from "express";

import cors from "cors";
const routes = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, () => {
  console.log(`🚀 Server ready at: http://localhost:3000`);
});
