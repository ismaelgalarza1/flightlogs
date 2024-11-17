import React from "react";
import classes from "../UI/cards.modules.css";

// going to start the card and laying out where they're going to be for the end user.
const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};
export default Card;
