import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material.module";

import { AppComponent } from "./app.component";
import { ManagePizzaComponent } from "./manage-pizza/manage-pizza.component";
import { CreatePizzaComponent } from "./create-pizza/create-pizza.component";
import { ApiInterceptor } from "./api-interceptor";
import { PizzaService } from "./pizza/pizza.service";
import { UndoService } from "./common/undo.service";
import { PizzaToppingsComponent } from "./pizza-toppings/pizza-toppings.component";
import { NoSelectionComponent } from "./no-selection/no-selection.component";
import { ToppingService } from "./topping/topping.service";
import { FormsModule } from "@angular/forms";
import { CreateToppingComponent } from "./create-topping/create-topping.component";
import { PizzaListComponent } from "./pizza-list/pizza-list.component";
@NgModule({
  declarations: [
    AppComponent,
    PizzaListComponent,
    ManagePizzaComponent,
    CreatePizzaComponent,
    PizzaToppingsComponent,
    NoSelectionComponent,
    CreateToppingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    PizzaService,
    ToppingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
