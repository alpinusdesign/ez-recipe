import React from "react";

const Ingredient = (props) => {
  return (
    <div className="item-container-ingredient">
      {/* - Ingredient index - */}
      <span className="item-index">{props.index + 1}</span>
      {/* - Ingredient input - */}
      <input
        className="item-input"
        type="text"
        value={props.ingredient.text}
        onChange={(e) => {
          props.onChangeIngredient(e, props.index);
        }}
      ></input>
      {/* - Remove ingredient button - */}
      <button
        className="btn-item-delete"
        type="button"
        onClick={() => {
          props.removeIngredient(props.index);
        }}
      ></button>
    </div>
  );
};

export default Ingredient;
