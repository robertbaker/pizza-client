import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-no-selection",
  template: `
    <div fxLayout="row" class="panel" fxFlexFill fxLayoutGap="16px">
      <div class="title-heading">
        <h2>Select a pizza from the list to edit the toppings</h2>
        <h3>or create a pizza</h3>
      </div>
    </div>
  `,
  styles: [".panel { background-color: #e3e3e3; padding:48px;}"]
})
export class NoSelectionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
