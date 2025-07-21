import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BadgeDirective } from './badge.directive';

@Component({
  template: `<div type="text" [badge]="1"></div>`,
})
class TestBadgeComponent {
}

describe('BadgeDirective', () => {
  let component: TestBadgeComponent;
  let fixture: ComponentFixture<TestBadgeComponent>;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeDirective, TestBadgeComponent],
      providers: [Renderer2],      
    });

    fixture = TestBed.createComponent(TestBadgeComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(TestBadgeComponent));
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
