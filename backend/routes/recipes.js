const router = require("express").Router();
let Recipe = require("../models/recipes.model");

/* - GET - */
// Get ALL recipes.
router.route("/").get((req, res) => {
  Recipe.find()
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get the specified recipe.
router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then((recipes) => res.json(recipes))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* - DELETE - */
// Remove the specified recipe.
router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

/* - PUT - */
// Update specified recipe with input data.
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
// Add new recipe to database.
router.route("/").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const ingredients = req.body.ingredients;
  const instructions = req.body.instructions;

  // Add submitted data to recipe.
  const newRecipe = new Recipe({
    name,
    description,
    ingredients,
    instructions,
  });

  // Add new recipe to database.
  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
