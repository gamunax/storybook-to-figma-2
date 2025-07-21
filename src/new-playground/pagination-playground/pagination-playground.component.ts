import { Component } from '@angular/core';
import { Actions, Colors, PaginationInfo, PaginationRadius, PaginationSizings, Styles } from 'atlas-cdk';
import { PaginationVariants } from 'atlas-pagination';
@Component({ 
  selector: 'pagination-playground',
  templateUrl: './pagination-playground.component.html',
  styleUrls: ['./pagination-playground.component.scss']
})
export class PaginationPlayground{

  paginationInfo: PaginationInfo = {
    page: 1,
    itemsByPage: 10,
    total: 200,
  };
  itemsByPageOptions = [5, 10, 25, 50];
  paginationSizings = PaginationSizings;
  paginationVariants = PaginationVariants;
  paginationRadius = PaginationRadius;
  actions = Actions;
  colors = Colors;
  styles = Styles;
  
  onLoadPageNumberRequested(pageRequested: number) {
    this.paginationInfo = { ...this.paginationInfo, page: pageRequested };
    console.log("🎾 onLoadPageNumberRequested:", this.paginationInfo);
  }

  onLoadPaginationInfoRequest(paginationInfoRequested: PaginationInfo) {
    this.paginationInfo = { ...this.paginationInfo, page: paginationInfoRequested.page, itemsByPage: paginationInfoRequested.itemsByPage };
    console.log("⭐️ onLoadPaginationInfoRequest -> paginationInfoRequested", paginationInfoRequested);
  }
  onChangeTotalPagination(event: any): void {
    const target = event.target as HTMLInputElement;
    this.paginationInfo = { ...this.paginationInfo, total: Number(target.value) };
  }
  onLoadPageNumberRequestedDynamic(event: any) {
    const pageRequested = event.target?.value;
    this.paginationInfo = { ...this.paginationInfo, page: Number(pageRequested) };
    console.log(this.paginationInfo);
  }
}