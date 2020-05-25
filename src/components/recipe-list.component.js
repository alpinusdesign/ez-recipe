import React, { Component } from "react";
import RecipeMini from "./recipe-mini.component";
import axios from "axios";

class RecipeList extends Component {
  constructor(props) {
    super(props);

    // Function bindings
    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = {
      recipes: [],
    };
  }

  recipeList() {
    return this.state.recipes.map((currentRecipe) => {
      return (
        <RecipeMini
          recipe={currentRecipe}
          deleteRecipe={this.deleteRecipe}
          key={currentRecipe._id}
        />
      );
    });
  }

  deleteRecipe(id) {
    axios.delete("http://localhost:5000/recipes/" + id).then((res) => {
      console.log(res.data);
    });

    this.setState({
      recipes: this.state.recipes.filter((el) => el._id !== id),
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/recipes/")
      .then((res) => {
        this.setState({ recipes: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return <div>{this.recipeList()}</div>;
  }
}

export default RecipeList;
