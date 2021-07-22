import React from "react";

const SelectorButton = (props) =>{

  let buttonClassname = props.className;
  buttonClassname += (props.activeStatus) ? ` active` : ``;

  return (
    <button
      data-element-type={props.dataType}
      className={buttonClassname}
      onClick={props.onClick}
    >{props.children}
      <i
        className="fa--converter fa fa-angle-down"
         data-element-type={props.dataType}></i>
    </button>
  )
}

export default SelectorButton;