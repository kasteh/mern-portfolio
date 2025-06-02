require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error(err));

// Exemple de modèle pour les expériences
const Experience = mongoose.model("Experience", {
  title: String,
  company: String,
  period: String,
  description: String,
});

// Route pour récupérer les expériences
app.get("/api/experiences", async (req, res) => {
  const experiences = await Experience.find();
  res.json(experiences);
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur backend sur le port ${PORT}`));
