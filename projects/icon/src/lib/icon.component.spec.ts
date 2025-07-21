import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemingService } from 'atlas-cdk';
import { IconComponent } from './icon.component';
import { IconSizes } from './icon.const';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent],
      providers: [ThemingService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should accept string values for icon, color, collection, role, and other inputs', () => {
  component.icon = 'thumb_up';
  component.color = 'primary';
  component.collection = 'system';
  component.role = 'img';
  component.alt = 'Thumb up icon';
  component.ariaLabelledBy = 'icon-label';
  component.ariaTitle = 'Icon title';
  component.title = 'Icon title';
  component.iconSheetUrl = 'https://example.com/icon-sheet-url';
  fixture.detectChanges();

  expect(typeof component.icon).toBe('string');
  expect(typeof component.color).toBe('string');
  expect(typeof component.collection).toBe('string');
  expect(typeof component.role).toBe('string');
  expect(typeof component.alt).toBe('string');
  expect(typeof component.ariaLabelledBy).toBe('string');
  expect(typeof component.ariaTitle).toBe('string');
  expect(typeof component.title).toBe('string');
  expect(typeof component.iconSheetUrl).toBe('string');
});

it('should accept IconSizes enum values for size input', () => {
  component.size = IconSizes.large;
  fixture.detectChanges();
  expect(component.size).toEqual(IconSizes.large);
});

it('should accept true or undefined values for ariaHidden input', () => {
  component.ariaHidden = true;
  fixture.detectChanges();
  expect(component.ariaHidden).toBeTruthy();

  component.ariaHidden = undefined;
  fixture.detectChanges();
  expect(component.ariaHidden).toBeUndefined();
});

  it('should set icon styles for non-outline icons', () => {
    component.icon = 'thumb_up';
    component.size = IconSizes.large;
    component.color = 'primary';
    fixture.detectChanges();

    const expectedStyles = {
      height: `var(--icon-size-${IconSizes.large})`,
      width: `var(--icon-size-${IconSizes.large})`,
      color: `var(--${component.color})`
    };

    expect(component.setIconStyles()).toEqual(expectedStyles);
  });

  it('should set icon styles for outline icons', () => {
    component.icon = 'thumb_up-outline';
    component.size = IconSizes.small;
    component.color = 'secondary';
    fixture.detectChanges();

    const expectedStyles = {
      height: `var(--icon-size-${IconSizes.small})`,
      width: `var(--icon-size-${IconSizes.small})`,
      stroke: `var(--${component.color})`,
      fill: `none`
    };

    expect(component.setIconStyles()).toEqual(expectedStyles);
  });
});
