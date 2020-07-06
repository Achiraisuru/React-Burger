import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummery';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7

}



class BurgerBuilder extends Component{
    // constructor(props){
    //     super();
    //     this.state ={......}
    // }


    state={
       ingredients:{
           salad:0,
           bacon:0,
           cheese:0,
           meat:0
       },
       totalPrice:4,
       purchaseable:false,
       purchasing:false
    }


    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        }).reduce((sum,el) => {
            return sum+el;
        },0);

        this.setState({purchaseable:sum > 0});
    }


    addIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);

    }


    removeIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }


    purchaseHandler  = () =>{
        this.setState({purchasing:true});
    }

    purchaseCanclHandler = () => {
        this.setState({purchasing:false});
    }

    render(){

        const disanledInfo = {
            ...this.state.ingredients
        };

        for(let key in disanledInfo){
            disanledInfo[key] = disanledInfo[key] <= 0
        }

        return(
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCanclHandler}>
                  <OrderSummary ingredients={this.state.ingredients}/>
              </Modal>
              <Burger ingredients={this.state.ingredients} />
              <BuildControls
                ingredientsAdded={this.addIngredientsHandler}
                ingredientRemoved={this.removeIngredientsHandler}
                disabled={disanledInfo}
                purchaseable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
              />
          </Aux>
        );
    }
}

export default BurgerBuilder;