import React ,{Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


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
       ingredients:null,
       totalPrice:4,
       purchaseable:false,
       purchasing:false,
       loading:false
    }


    componentDidMount(){
        console.log(this.props);
        axios.get('https://react-my-burger-a082b.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients:response.data});
        });
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

    purchaseContinueHandler = () =>{
        // alert('You continue!');
// this.setState({loading:true});
//         const order ={
//             ingredients:this.state.ingredients,
//             price:this.state.totalPrice,
//             customer:{
//                 name:'isuru bandara',
//                 address:{
//                     street:'no-125',
//                     zipcode:'41351',
//                     country:'germany'
//                 },
//                 email:'test@test.com'
//             },
//             deliveryMethod:'fastest'
//         }
//         axios.post('/orders.json',order)
//         .then(response => {
//             this.setState({loading:false,purchasing:false});
//         })
//         .catch(err =>{
//             this.setState({loading:false,purchasing:false});
//         });
const queryParams = [];
for(let i in this.state.ingredients){
    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
}
const queryString = queryParams.join('&');
this.props.history.push({
    pathname:'/checkout',
    search:'?' + queryString
});

    }

    render(){

        const disanledInfo = {
            ...this.state.ingredients
        };

        for(let key in disanledInfo){
            disanledInfo[key] = disanledInfo[key] <= 0
        }
        let orderSummary = null;
       
    
        let burger = <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
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
                orderSummary =  <OrderSummary 
                ingredients={this.state.ingredients} 
                purchaceCanceled={this.purchaseCanclHandler}
                purchaceContinue={this.purchaseContinueHandler}
                price={this.state.totalPrice}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
       

        return(
          <Aux>
              <Modal show={this.state.purchasing} modalClosed={this.purchaseCanclHandler}>
                 {orderSummary}
              </Modal>
              {burger}
          </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);