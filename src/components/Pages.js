import React from "react";
import {Switch, Route} from "react-router-dom";
import { Inicio } from "./Inicio";
import { ProductsList } from "./Products";
import { ProductDetails } from "./ProductsDetails";

export const Pages = () => {
    return(
        <section>
            <Switch>
                <Route path='/' exact component={Inicio}/>
                <Route path='/productos' exact component={ProductsList} />
                <Route path='/producto/:id' exact component={ProductDetails} />           
            </Switch>
        </section>
    )
}