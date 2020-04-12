import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {log} from 'util';

interface DrinksCategory {
  drinks: [
    {strCategory: string}
  ]
}

interface Coctail {
  name: string,
  isChecked: boolean,
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  listOfCategoriestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  catData = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';

  coctails: Coctail[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<DrinksCategory>(this.listOfCategoriestUrl)
      .pipe(
        tap(cats => console.log(cats)),
        map(cats => cats.drinks.map(cat => cat.strCategory))
      )
      .subscribe(categoryTitles => {
        console.log(categoryTitles);
        categoryTitles.forEach( (title, index) => this.coctails.push({ name: title, isChecked: true }) );
      });

    this.http.get<DrinksCategory>(this.catData)
      .subscribe(res => console.log(res));
  }

}
