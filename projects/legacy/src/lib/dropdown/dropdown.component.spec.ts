import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent, DropdownItemComponent, DropdownLabelComponent } from './dropdown.component';
import { PortalModule } from '@angular/cdk/portal';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [PortalModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
