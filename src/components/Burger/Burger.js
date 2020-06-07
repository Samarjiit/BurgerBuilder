import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import { object } from "prop-types";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    //transfrom object into array
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  }).reduce((arr,el)=>{             //arr-previous value and el-current value.it's these inner arrays which are interesting to us. What we can do is we can simply flatten this array to make sure we pull out the values of these inner arrays and trade one array only which contains all these values, we can do that by adding reduce to our transformedIngredients logic here, reduce is a built-in array function which allows us to transform an array into something else. It takes a function as an input and this function receives two arguments passed in automatically by javascript, the previous value and the current value.it also accepts an initial value,let's say an empty array.So the initial value of the reduced value
    return arr.concat(el)
  },[]);
  if(transformedIngredients.length===0){
    transformedIngredients =<p>please starting adding ingredients!</p>;
  }

  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />

      {transformedIngredients}

      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
