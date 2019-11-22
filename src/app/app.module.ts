import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './core/header/main-nav/main-nav.component';
import {MatMenuModule} from '@angular/material/menu';
import { SimpleDemoComponent } from './demo/simple-demo/simple-demo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StackedBarComponent } from './pages/stacked-bar/stacked-bar.component';
import { HalfDonutComponent } from './pages/half-donut/half-donut.component';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    SimpleDemoComponent,
    DashboardComponent,
    StackedBarComponent,
    HalfDonutComponent,
    DataTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  // starting point
  bootstrap: [AppComponent]
})
export class AppModule { }
