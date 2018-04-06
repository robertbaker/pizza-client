import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { IPizza } from '../pizza/IPizza';
import { PizzaService } from '../pizza/pizza.service';
import { ParamMap, Router, ActivatedRoute, Params } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-manage-pizza',
  template: `
  <div class="container" [class.is-mobile]="mobileQuery.matches">
    <mat-toolbar color="primary" class="toolbar">
      <mat-toolbar-row>
        <div fxFlex fxLayout="row" fxLayoutGap="8px" fxLayoutAlign="start center">
          <button class="sidenav-toggle" mat-icon-button (click)="snav.toggle()" [fxShow]="mobileQuery.matches">
            <mat-icon>menu</mat-icon>
          </button>
        <div><span>Pizza Place</span></div>
        </div>
      </mat-toolbar-row>
    </mat-toolbar>
    <mat-sidenav-container #drawerp class="sidenav-container" [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
      <mat-sidenav [disableClose]="!mobileQuery.matches" [(opened)]="opened" [fixedInViewport]="mobileQuery.matches" #snav
        [mode]="mobileQuery.matches ? 'over' : 'side'" fixedTopGap="56">
        <mat-nav-list>
          <router-outlet name="list"></router-outlet>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet name="detail"></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
  `,
  styles: [
    '.sidenav-container {   flex: 1; }',
    '.is-mobile .sidenav-container { flex: 1 0 auto; }',
    '.is-mobile .toolbar { position: fixed; z-index: 2; }',
    '.container { display: flex; flex-direction: column; position: absolute; top: 0; bottom: 0; left: 0;  right: 0; }'
  ]
})
export class ManagePizzaComponent implements OnInit, OnDestroy {
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  public opened: boolean;
  public selectedPizzaId: number;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this.opened = !this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.opened = !this.mobileQuery.matches;
    this.route.params
      .pipe(map(params => (this.selectedPizzaId = +params['id'])))
      .subscribe(x => this.selectedPizzaId);
    this.router.events.subscribe(event => {
      if (this.mobileQuery.matches) {
        this.opened = false;
      }
    });
  }
}
