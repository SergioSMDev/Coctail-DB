import { Component, OnInit } from '@angular/core';
import {DrinkService} from '../drink.service';
import {FullCategory} from '../model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  data: FullCategory[];

  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.drinkService.getContentData()
      .subscribe(
        data => this.data = data,
        error => console.error(error)
      );
  }

}
