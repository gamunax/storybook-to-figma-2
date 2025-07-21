import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbItemSeparatorComponent } from './breadcrumb-item-separator.component';

describe('BreadcrumbItemSeparatorComponent', () => {
  let component: BreadcrumbItemSeparatorComponent;
  let fixture: ComponentFixture<BreadcrumbItemSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbItemSeparatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbItemSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
