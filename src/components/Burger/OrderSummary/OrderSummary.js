import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return( 
      <li key={igKey}>
        <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
        
      </li>);
    
  });

  return (
    <Aux>
      <h3>YOUR ORDER</h3>
      <p>a delicious burger with the following ingredients:</p>
      <ul>
          {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>CONTINUE TO CHECKOUT?</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;
