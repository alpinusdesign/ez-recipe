import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {},
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/recipes/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ recipe: res.data });
        console.log(this.state.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <article>
        <header>
          <Link to={"/"} className="btn-return">
            Tillbaka till alla recept
          </Link>
          <Link to={"/edit"} className="btn-edit">
            Redigera
          </Link>
          <button
            className="btn-delete"
            onClick={() => this.state.deleteRecipe(this.state.recipe._id)}
          >
            Radera
          </button>
        </header>
        <main>
          <h2>{this.state.recipe.name}</h2>
          <h3>Description</h3>
          <p>{this.state.recipe.description}</p>
          <h3>Ingredients</h3>
          {/* <ul>
            {this.state.recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <ul>
            {this.state.recipe.instructions.map((instruction) => (
              <li>{instruction}</li>
            ))}
          </ul> */}
        </main>
      </article>
    );
  }
}

export default Recipe;
