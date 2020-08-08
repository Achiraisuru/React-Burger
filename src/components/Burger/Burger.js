import React from 'react';
import classes from './Burger.css';
import BurgerIngrediant from './BurgerIngrediants/BurgerIngrediants';


const burger = (props) => {
console.log(props);
    let transformefIngredients = Object.keys(props.ingredients).map(igkey => {
         return [...Array(props.ingredients[igkey])].map((_,i) => {
             return <BurgerIngrediant key={igkey + i} type={igkey}/>
         });
        
    }).reduce((arr,el) => {
        return arr.concat(el);
    },[]);

    if(transformefIngredients.length === 0){
        transformefIngredients = <p>Please start adding ingredients!</p>

    }


    console.log(transformefIngredients);

    

    return(
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top"/>
                {transformefIngredients}
            <BurgerIngrediant type="bread-bottom"/>
        </div>
    );
}

export default  burger;