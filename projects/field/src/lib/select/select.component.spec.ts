import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FieldModule } from '../../public-api';

import { HaloSelectComponent } from './select.component';

describe('HaloSelectComponent', () => {
  let component: HaloSelectComponent;
  let fixture: ComponentFixture<HaloSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FieldModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaloSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
