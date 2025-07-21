import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions } from 'atlas-cdk';

import { LinkComponent, LinkTargets } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept boolean values for underline and external inputs', () => {
    component.underline = true;
    component.external = true;
    fixture.detectChanges();
  
    expect(typeof component.underline).toBe('boolean');
    expect(typeof component.external).toBe('boolean');
  });
  
  it('should accept string values from Actions enum for action input', () => {
    component.action = Actions.primary;
    fixture.detectChanges();
    expect(component.action).toEqual(Actions.primary);
  });
  
  it('should accept string values from LinkTargets enum for target input', () => {
    component.target = LinkTargets.blank;
    fixture.detectChanges();
    expect(component.target).toEqual(LinkTargets.blank);
  });
  
  it('should accept string values for typography and url inputs', () => {
    component.typography = 'typographyStyles-body-medium';
    component.url = 'https://example.com';
    fixture.detectChanges();
  
    expect(typeof component.typography).toBe('string');
    expect(typeof component.url).toBe('string');
  });
  
});
