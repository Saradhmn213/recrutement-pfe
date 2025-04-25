const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { json, urlencoded } = require("express");
const cors = require("cors");

const User = require("./models/user");
const GenericController = require("./controllers/genericController");
const authRouter = require("./routes/authRoutes");
const GenericRouter = require("./routes/genericRouter");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(json());

// User
const userService = new GenericService(User);
const userController = new GenericController(userService);
const userRouter = new GenericRouter(userController).getRouter();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// Connexion à la BDD MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

app.use(express.json());

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
