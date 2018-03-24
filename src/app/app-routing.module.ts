import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagePizzaComponent } from "./manage-pizza/manage-pizza.component";
import { CreatePizzaComponent } from "./create-pizza/create-pizza.component";
import { CreateToppingComponent } from "./create-topping/create-topping.component";
import { PizzaListComponent } from "./pizza-list/pizza-list.component";
import { PizzaToppingsComponent } from "./pizza-toppings/pizza-toppings.component";
import { PizzaResolver } from "./pizza/pizza.resolver";
import { ToppingsResolver } from "./topping/topping.resolver";

const routes: Routes = [
  {
    path: "pizza",
    pathMatch: "full",
    component: ManagePizzaComponent,
    resolve: {
      pizzas: PizzaResolver,
      toppings: ToppingsResolver
    }
  },
  {
    path: "pizza/:id",

    pathMatch: "full",
    component: ManagePizzaComponent,
    resolve: {
      pizzas: PizzaResolver,
      toppings: ToppingsResolver
    }
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "pizza"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
