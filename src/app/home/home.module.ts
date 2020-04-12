import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FilterComponent } from './filter/filter.component';
import { ContentComponent } from './content/content.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [HomeComponent, FilterComponent, ContentComponent],
  imports: [
    CommonModule,
    // HttpClientModule,
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
