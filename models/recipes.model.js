/* - Recipe-schema - */
const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let recipeSchema = new Schema({
  name: String,
  description: String,
  ingredients: [{ text: String }],
  instructions: [{ text: String }],
});

module.exports = mongoose.model("Recipes", recipeSchema);
