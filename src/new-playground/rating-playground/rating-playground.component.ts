import { Component } from '@angular/core';
import { RatingSizings } from 'atlas-cdk';

@Component({
  selector: 'rating-playground',
  templateUrl: './rating-playground.component.html',
  styleUrls: ['./rating-playground.component.scss']
})
export class RatingPlayground{

  ratingSizings = RatingSizings;

  public onRated($event: any): void{
    alert('rating event ' + $event)
  }
 }