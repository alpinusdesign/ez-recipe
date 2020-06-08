import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeMini from "./Recipe-mini.component";
import axios from "axios";

class RecipeList extends Component {
  /* - Constructor - */
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
    };
  }

  // Prints all recipes.
  recipeList = () => {
    return this.state.recipes.map((currentRecipe) => {
      return (
        <RecipeMini
          recipe={currentRecipe}
          deleteRecipe={this.deleteRecipe}
          key={currentRecipe._id}
        />
      );
    });
  };

  // Removes the recipe from the database.
  deleteRecipe = (id) => {
    axios.delete("/api/recipes/" + id).then((res) => {
      console.log(res.data);
    });
    this.setState({
      recipes: this.state.recipes.filter((el) => el._id !== id),
    });
  };

  /* - Lifecycle methods - */
  // Get all recipes from database.
  componentDidMount() {
    axios
      .get("/api/recipes/")
      .then((res) => {
        this.setState({ recipes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <main className="Recipe-list">
        {/* - Print recipes - */}
        {this.recipeList()}

        {/* - Link to recipe-creator - */}
        <Link to={"/add"} className="btn-add">
          Lägg till nytt recept
        </Link>
      </main>
    );
  }
}

export default RecipeList;
