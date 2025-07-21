import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloaderComponent } from './preloader.component';
import { SimpleChange } from '@angular/core';

describe('PreloaderComponent', () => {
  let component: PreloaderComponent;
  let fixture: ComponentFixture<PreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should load', () => {
    component.loading = false;
    component.load();
    expect(component.loading).toBe(true);
  });

  it('should have loaded', () => {
    component.loading = true;
    component.loaded();
    expect(component.loading).toBe(false);
  });

  it('should check if going from loading to loaded', () => {
    component.loading = true;
    component.ngOnChanges({
      loading: new SimpleChange(true, false, false)
    });
    expect(component.loading).toBe(false);
  });
});
