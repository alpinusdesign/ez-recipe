import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class RecipeFull extends Component {
  /* - Constructor - */
  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        name: "",
        description: "",
        ingredients: [],
        instructions: [],
      },
      redirect: false,
    };
  }

  /* - General methods - */
  // Removes the recipe from the database and indirectly redirects on next render.
  deleteRecipe(id) {
    axios.delete(`http://localhost:5000/recipes/${id}`).then((res) => {
      console.log(res.data);
      this.setState({ redirect: true });
    });
  }

  /* - Lifecycle methods - */
  componentDidMount() {
    axios
      .get(`http://localhost:5000/recipes/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ recipe: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.redirect === true) {
      // Redirect to homepage.
      return <Redirect to="/" />;
    }
    return (
      <article className="Recipe-full">
        <nav className="nav-recipe">
          {/* - Link to recipe list - */}
          <Link to={"/"} className="btn-recipe-return">
            Tillbaka till alla recept
          </Link>
          <div className="utility">
            {/* - Link to recipe editor - */}
            <Link
              to={`/edit/${this.state.recipe._id}`}
              className="btn-recipe-edit"
            >
              Redigera
            </Link>

            {/* - Remove recipe-button- */}
            <button
              className="btn-recipe-delete"
              onClick={() => this.deleteRecipe(this.state.recipe._id)}
            >
              Radera
            </button>
          </div>
        </nav>

        <main>
          {/* - Heading - */}
          <h2>{this.state.recipe.name}</h2>

          {/* - Description - */}
          <div>
            <h3>Beskrivning</h3>
            <p>{this.state.recipe.description}</p>
          </div>
          {/* - Ingredients - */}
          <div>
            <h3>Ingredienser</h3>
            <ul className="item-list-ingredient">
              {this.state.recipe.ingredients.map((ingredient) => (
                <li key={ingredient._id}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
          {/* - Instructions - */}
          <div>
            <h3>Instruktioner</h3>
            <ol className="item-list-instruction">
              {this.state.recipe.instructions.map((instruction) => (
                <li key={instruction._id}>{instruction.text}</li>
              ))}
            </ol>
          </div>
        </main>
      </article>
    );
  }
}

export default RecipeFull;
