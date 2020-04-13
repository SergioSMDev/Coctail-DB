import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrinkService } from './drink.service';
import { HomeComponent } from './home.component';
import { FilterComponent } from './filter/filter.component';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [HomeComponent, FilterComponent, ContentComponent ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    DrinkService,
  ]
})
export class HomeModule { }
