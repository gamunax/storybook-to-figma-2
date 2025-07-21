import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdkModule } from 'atlas-cdk';

import { TabComponent, TabGroupComponent } from './tabs.component';

describe('TabGroupComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CdkModule],
      declarations: [ TabComponent ],
      providers: [TabGroupComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
