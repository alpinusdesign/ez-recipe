const router = require("express").Router();
let Recipe = require("../models/recipes.model");

/* - GET - */
// Hämta alla recept.
router.route("/").get((req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Hämta recept med angivet ID.
router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* - DELETE - */
// Radera recept med angivet ID.
router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* - PUT - */
// Uppdatera recept med angivet ID och angivna data.
router.route("/:id").put((req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
  })
    .then(() => res.json("Recipe updated."))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* - POST - */
// Lägg till nytt recept med angivna data.
router.route("/").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  // Mata in mottagen data i nytt recept.
  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    instructions,
  });

  // Lägg till nytt recept till databas.
  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
