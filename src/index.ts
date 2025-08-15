import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
const PORT = Number(process.env.PORT) || 6000;

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
