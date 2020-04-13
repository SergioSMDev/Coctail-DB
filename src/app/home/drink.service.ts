import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {CoctailFillter, DrinksCategory, FullCategory} from './model';
import {map} from 'rxjs/operators';
import {BehaviorSubject, forkJoin, Observable, Subject, Subscription} from 'rxjs';

@Injectable()
export class DrinkService implements OnDestroy{
  private listOfCategoriestUrl = environment.drinksConfig.listOfCategories;
  private drinksOfCategoryUrl =  environment.drinksConfig.singleCategory;
  private categoryTitlesSbj =  new Subject<CoctailFillter[]>(); // [{name: '', isChecked: false}]
  private fullCategorySbj =  new Subject<FullCategory[]>();
  private sub: Subscription;

  constructor(private http: HttpClient) { }

  getAllCategoriesTitle(): Observable<CoctailFillter[]> {
    this.http.get<DrinksCategory>(this.listOfCategoriestUrl)
      .pipe(
        map(cats => cats.drinks.map(cat => cat.strCategory))
      )
      .subscribe(categoryTitles => {
        const coctails: CoctailFillter[] = categoryTitles.map( title => ({ name: title, isChecked: true }) );
        this.categoryTitlesSbj.next(coctails);
});
    return this.categoryTitlesSbj.asObservable();
  }

  updateContent(titles: string[]){
    let categoriesContent: FullCategory[];

    this.sub = forkJoin(
                titles.map(name => this.http.get<{drinks: [{strDrink: string, strDrinkThumb: string, idDrink: string}] }>(this.drinksOfCategoryUrl + name) ),
              )
                .subscribe(
                  drinkListOfCategories => {
                    categoriesContent = titles.map( (categoryName, index) => {
                        return {
                          categoryTitle: categoryName,
                          drinks: drinkListOfCategories[index].drinks.map( (singleDrink) => {
                            return {
                              title: singleDrink.strDrink,
                              imageUrl: singleDrink.strDrinkThumb,
                              id: singleDrink.idDrink,
                            };
                          })
                        } as FullCategory;
                      });
                    this.fullCategorySbj.next(categoriesContent);
                  },
                  error => console.error(error),
                );
  }

  getContentData(): Observable<FullCategory[]>{
    return this.fullCategorySbj.asObservable();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
