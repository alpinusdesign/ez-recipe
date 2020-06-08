import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Instruction from "./Item-instruction.component";
import Ingredient from "./Item-ingredient.component";

class RecipeCreator extends Component {
  /* - Constructor - */
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
    };
  }

  /* - onChange handlers - */
  // Changes the components state according to the input fields change.
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangeIngredient = (e, index) => {
    let newArr = [...this.state.ingredients];
    newArr[index] = { text: e.target.value };
    this.setState({ ingredients: newArr });
  };
  onChangeInstruction = (e, index) => {
    let newArr = [...this.state.instructions];
    newArr[index] = { text: e.target.value };
    this.setState({ instructions: newArr });
  };

  /* - Ingredient related functions - */
  // Adds new ingredient to the ingredient list.
  addIngredient = () => {
    let newEl = { text: "" };
    this.setState({ ingredients: [...this.state.ingredients, newEl] });
  };

  // Removes ingredient from the ingredient list.
  removeIngredient = (id) => {
    let newArr = [...this.state.ingredients];
    newArr.splice(id, 1);

    this.setState({
      ingredients: newArr,
    });
  };

  /* - Instruction related functions - */
  // Adds new instruction to the instruction list.
  addInstruction = () => {
    let newEl = { text: "" };
    this.setState({ instructions: [...this.state.instructions, newEl] });
  };

  // Removes instruction from the instruction list.
  removeInstruction = (id) => {
    let newArr = [...this.state.instructions];
    newArr.splice(id, 1);

    this.setState({
      instructions: newArr,
    });
  };

  /* - Other methods - */
  // Adds the recipe to the database and indirectly redirects on next render.
  onSubmitRecipe = (e) => {
    e.preventDefault();

    axios
      .post("/api/recipes/", {
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ redirect: true });
      });
  };

  /* - Lifecycle methods - */
  render() {
    if (this.state.redirect === true) {
      // Redirect to homepage.
      return <Redirect to="/" />;
    }

    return (
      <section className="Recipe-creator">
        <nav className="nav-recipe">
          {/* - Link to recipe list - */}
          <Link className="btn-recipe-return" to="/">
            {" "}
            Tillbaka till alla recept
          </Link>
        </nav>
        <main>
          {/* - Heading - */}
          <h2>Lägg till recept</h2>

          {/* - Form - */}
          <form onSubmit={this.onSubmitRecipe}>
            {/* - Name - */}
            <fieldset>
              <label>Namn:</label>
              <input
                type="text"
                onChange={this.onChangeName}
                value={this.state.name}
              ></input>
            </fieldset>
            {/* - Description - */}
            <fieldset>
              <label>Beskrivning</label>
              <textarea
                rows="6"
                onChange={this.onChangeDescription}
                value={this.state.description}
              ></textarea>
            </fieldset>
            {/* - Ingredients - */}
            <fieldset>
              <legend>Ingredienser</legend>
              {this.state.ingredients.map((ingredient, index) => (
                <Ingredient
                  ingredient={ingredient}
                  removeIngredient={this.removeIngredient}
                  onChangeIngredient={this.onChangeIngredient}
                  key={index}
                  index={index}
                ></Ingredient>
              ))}

              {/* - Add ingredient button - */}
              <button
                type="button"
                onClick={this.addIngredient}
                className="btn-add"
              >
                Lägg till ingrediens
              </button>
            </fieldset>

            {/* - Instructions - */}
            <fieldset>
              <legend>Instruktioner</legend>
              {this.state.instructions.map((instruction, index) => (
                <Instruction
                  instruction={instruction}
                  removeInstruction={this.removeInstruction}
                  onChangeInstruction={this.onChangeInstruction}
                  key={index}
                  index={index}
                ></Instruction>
              ))}

              {/* - Add instruction step button - */}
              <button
                type="button"
                onClick={this.addInstruction}
                className="btn-add"
              >
                Lägg till steg
              </button>
            </fieldset>

            {/* - Submit button - */}
            <input
              type="submit"
              value="Ladda upp recept"
              className="btn"
            ></input>
          </form>
        </main>
      </section>
    );
  }
}

export default RecipeCreator;
