/*
    Namn: Linus Östlund
    Kurs: DT162G, JavaScriptbaserad webbutveckling, 7.5hp
    Moment: Projektarbete
    Senast uppdaterad: 2020-05-20
*/

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Använd enviromentvariabel.
require("dotenv").config();

// Instansiera express-objekt.
const app = express();

// Välj port baserat på enviromentvariabeln. Annars, välj port 5000.
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Anslut Mongoose till databasen som befinner sig i enviromentvariabelns URI.
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Etablera databasanslutning.
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection was established successfully.");
});

// Dirigera trafik till recepthanterare.
const recipesRouter = require("./routes/recipes");
app.use("/api/recipes", recipesRouter);

// Kör server.
app.listen(port, () => {
  console.log(`Server is now running on port ${port}`);
});
