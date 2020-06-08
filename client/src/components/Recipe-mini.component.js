import React from "react";
import { Link } from "react-router-dom";
const RecipeMini = (props) => {
  return (
    <div className="Recipe-mini">
      <Link to={`/recipe/${props.recipe._id}`}>
        {/* - Link to the full recipe - */}
        {props.recipe.name}
      </Link>
      <div className="utility">
        {/* - Link to recipe editor - */}
        <Link to={`/edit/${props.recipe._id}`} className="btn-recipe-edit">
          Redigera
        </Link>

        {/* - Remove recipe-button - */}
        <button
          className="btn-recipe-delete"
          onClick={() => props.deleteRecipe(props.recipe._id)}
        >
          Radera
        </button>
      </div>
    </div>
  );
};

export default RecipeMini;
