import React from "react";
import { Link } from "react-router-dom";

const RecipeMini = (props) => {
  return (
    <Link
      to={`/${props.recipe._id}`}
      recipe={props.recipe}
      className="recipe-mini"
    >
      <h2>{props.recipe.name}</h2>
      <Link to={"/edit"} className="btn-edit">
        Redigera
      </Link>
      <button
        className="btn-delete"
        onClick={() => props.deleteRecipe(props.recipe._id)}
      >
        Radera
      </button>
    </Link>
  );
};

export default RecipeMini;
