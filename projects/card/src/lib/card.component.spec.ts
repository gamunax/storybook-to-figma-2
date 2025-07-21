import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundColors, BoxShadows, SurfaceColors, TextColors } from 'atlas-cdk';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test bool
  it('should accept boolean value for avatar', () => {
    component.avatar = true;
    fixture.detectChanges();
    expect(component.avatar).toBeTruthy();
  
    component.avatar = false;
    fixture.detectChanges();
    expect(component.avatar).toBeFalsy();
  });

  // Test type specific inputs
  it('should accept a value from SurfaceColors for background input', () => {
    const surfaceValue = SurfaceColors['surface-default-dark'];
    component.background = surfaceValue;
    fixture.detectChanges();
    expect(component.background).toEqual(surfaceValue);
  });

  it('should accept a value from BackgroundColors for background input', () => {
    const bgValue = BackgroundColors['background-default-light'];
    component.background = bgValue;
    fixture.detectChanges();
    expect(component.background).toEqual(bgValue);
  });

  it('should accept a value from TextColors for textColor input', () => {
    const textColorValue = TextColors['text-default-disabled-dark'];
    component.textColor = textColorValue;
    fixture.detectChanges();
    expect(component.textColor).toEqual(textColorValue);
  });

  it('should accept a value from BoxShadows for elevation input', () => {
    const boxShadowValue = BoxShadows.elevated;
    component.elevation = boxShadowValue;
    fixture.detectChanges();
    expect(component.elevation).toEqual(boxShadowValue);
  });

  it('should update the background color after change', () => {
    const newBackgroundColor = SurfaceColors['some-other-color'];
    component.background = newBackgroundColor;
    fixture.detectChanges();
    expect(component.background).toEqual(newBackgroundColor);
  });

  it('should update the text color after change', () => {
    const newTextColor = TextColors['some-other-text-color'];
    component.textColor = newTextColor;
    fixture.detectChanges();
    expect(component.textColor).toEqual(newTextColor);
  });

  // Test string inputs
  it('should set padding strings correctly', () => {
    // Test string input
    component.contentPaddingClass = 'padding-y-16';
    expect(component.contentPaddingClass).toBe('padding-y-16');
    
    component.footerPaddingClass = 'padding-y-16';
    expect(component.footerPaddingClass).toBe('padding-y-16');

    component.mediaPaddingClass = 'padding-y-16';
    expect(component.mediaPaddingClass).toBe('padding-y-16')
    
    component.subheaderPaddingClass = 'padding-y-16';
    expect(component.subheaderPaddingClass).toBe('padding-y-16');

    component.avatarPaddingClass = 'padding-y-16';
    expect(component.avatarPaddingClass).toBe('padding-y-16');
  });
});
