import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false, //once we buy the burger it will become true
    purchasing:false  //it is false when order now button is clcik
  };

  updatePurchaseState(ingredients) {  // to get updated ingredients we pass argument
    //const ingredients = {
      //...this.state.ingredients,
   // };
    //now need to sumup all the values so turn the above object into array
    const sum=Object.keys(ingredients)              //will create array of string for salad,bacon .The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
            .map(igKey=>{
                return ingredients[igKey] ;   //we fetch values or numbers from the ingredients 
            })
            //now we have array of values and now we will do reduce
            .reduce((sum,el)=>{//used to get a  single sum of numbers/values of ingredients.it is a function which execute on each element in map array.0 is the starting value sum is updated values and el is the value access from ingredients[igkey]
                return sum +el;
            },0);      
            this.setState({purchasable:sum>0})   //if sum >o than it will true and than it will execute


  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients, //refer to all elements in state object
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };


  purchaseHandler=()=>{
      this.setState({purchasing:true});
  }
purchaseCancelHandle=()=>{
  this.setState({purchasing:false});
}

purchaseContinueHandle=()=>{
  alert('you continue!');
}

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //{Salad:true, meat:false,....}
    return (
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandle}>
              <OrderSummary ingredients={this.state.ingredients} 
              price={this.state.totalPrice}
              purchaseCancelled={this.purchaseCancelHandle}
              purchaseContinued={this.purchaseContinueHandle}/>
          </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
