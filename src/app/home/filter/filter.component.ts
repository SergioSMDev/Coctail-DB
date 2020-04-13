import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DrinkService} from '../drink.service';
import {CoctailFillter} from '../model';

/*interface DrinksCategory {
  drinks: [
    {strCategory: string}
  ]
}

interface CoctailFillter {
  name: string,
  isChecked: boolean,
}*/

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  coctails: CoctailFillter[];

  constructor(private drink: DrinkService) {}

  ngOnInit(): void {
    this.drink.getAllCategoriesTitle()
      .subscribe(coctails => {
        this.coctails = coctails;
        this.applyFillters();
      });
  }

  toggle(index: number){
    this.coctails[index].isChecked = !this.coctails[index].isChecked;
  }

  applyFillters(): void{
    const appliedCategories: string[] = [];
    this.coctails.forEach( category => (category.isChecked === true) && appliedCategories.push(category.name) );
    this.drink.updateContent(appliedCategories);
  }
}
