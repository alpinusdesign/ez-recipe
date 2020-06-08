import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Instruction from "./Item-instruction.component";
import Ingredient from "./Item-ingredient.component";

class RecipeEditor extends Component {
  /* - Constructor - */
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      description: "",
      ingredients: [],
      instructions: [],
      update: false,
      delete: false,
    };
  }

  /* - onChange handlers - */
  // Changes the components state according to the input fields change.
  onChangeName = (e) => {
    let newName = e.target.value;
    this.setState({ name: newName });
  };

  onChangeDescription = (e) => {
    let newDescription = e.target.value;
    this.setState({ description: newDescription });
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

  /* - Ingredient related methods - */
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
  // Updates the recipe data and indirectly redirects on next render.
  onSubmitRecipe = (e) => {
    e.preventDefault();

    axios
      .put(`/api/recipes/${this.state.id}`, {
        name: this.state.name,
        description: this.state.description,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ update: true });
      });
  };

  // Removes the recipe from the database and indirectly redirects on next render.
  deleteRecipe = (id) => {
    axios.delete(`/api/recipes/${id}`).then((res) => {
      console.log(res.data);
      this.setState({ delete: true });
    });
  };

  /* - Lifecycle methods - */
  // Fetches the recipe from the database if the component mounted correctly.
  componentDidMount() {
    axios
      .get(`/api/recipes/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          id: res.data._id,
          name: res.data.name,
          description: res.data.description,
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.delete === true) {
      // Redirect to homepage.
      return <Redirect to="/" />;
    } else if (this.state.update === true) {
      // Redirect to recipe-page.
      return <Redirect to={`/recipe/${this.state.id}`} />;
    }
    return (
      <section className="Recipe-editor">
        <nav className="nav-recipe">
          {/* - Link to recipe list - */}
          <Link className="btn-recipe-return" to="/">
            Tillbaka till alla recept
          </Link>

          {/* - Remove recipe-button - */}
          <button
            className="btn-recipe-delete"
            onClick={() => this.deleteRecipe(this.state.id)}
          >
            Radera
          </button>
        </nav>
        <main>
          {/* - Heading - */}
          <h2>Lägg till nytt recept</h2>

          {/* - Form - */}
          <form onSubmit={this.onSubmitRecipe}>
            <fieldset>
              {/* - Name - */}
              <label>Namn</label>
              <input
                type="text"
                onChange={this.onChangeName}
                value={this.state.name}
              ></input>
            </fieldset>

            <fieldset>
              {/* - Description - */}
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
              value="Uppdatera recept"
              className="btn"
            ></input>
          </form>
        </main>
      </section>
    );
  }
}

export default RecipeEditor;
