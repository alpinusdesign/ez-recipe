import React from "react";

const Instruction = (props) => {
  return (
    <div className="item-container-instruction">
      {/* - Instruction index - */}
      <span className="item-index">{props.index + 1}</span>
      {/* - Instruction input - */}
      <textarea
        className="item-input"
        rows="3"
        type="text"
        value={props.instruction.text}
        onChange={(e) => {
          props.onChangeInstruction(e, props.index);
        }}
      ></textarea>
      {/* - Remove instruction button - */}
      <button
        className="btn-item-delete"
        type="button"
        onClick={() => {
          props.removeInstruction(props.index);
        }}
      ></button>
    </div>
  );
};

export default Instruction;
