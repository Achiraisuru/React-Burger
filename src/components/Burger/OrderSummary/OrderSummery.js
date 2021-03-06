import React,{Component} from 'react'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    
    componentDidUpdate(){
        console.log('[OrderSummary] willupadate');
    }
    render(){

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey =>  {
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {this.props.ingredients[igkey]}</li>
        
        });

        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
    <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaceCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaceContinue}>CONTINUE</Button>
        </Aux>
        );
    }

}



export default OrderSummary;