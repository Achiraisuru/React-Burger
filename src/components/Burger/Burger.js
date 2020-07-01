import React from 'react';
import classes from './Burger.css';
import BurgerIngrediant from './BurgerIngrediants/BurgerIngrediants';


const burger = (props) => {

    const transformefIngredients = Object.keys(props.ingredients).map(igkey => {
         return [...Array(props.ingredients[igkey])].map((_,i) => {
             return <BurgerIngrediant key={igkey + i} type={igkey}/>
         });
        
    });


    

    return(
        <div className={classes.Burger}>
            <BurgerIngrediant type="bread-top"/>
                {transformefIngredients}
            <BurgerIngrediant type="bread-bottom"/>
        </div>
    );
}

export default burger;