import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';
import { DateTime } from 'luxon';

@Component({
  selector: 'datepicker-playground',
  templateUrl: './datepicker-playground.component.html',
  styleUrls: ['./datepicker-playground.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerPlayground implements OnInit {
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;
  form: UntypedFormGroup;
  toDate: Date = new Date(); // Today
  fromDate: Date = new Date(this.toDate.getTime() - 24 * 60 * 60 * 1000); // Yesterday
  selectedApplication: string | null = null;
  filterChanged = output<any>();
  @ViewChild('endDateRef') endDateRef: ElementRef;
  @ViewChild('startDateRef') startDateRef: ElementRef;
  public todate = DateTime.utc().toFormat('dd LLLL yyyy');
  public to = DateTime.utc().toFormat('dd LLLL yyyy');
  public from = DateTime.utc().minus({ months: 1 }).toFormat('dd LLLL yyyy');

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    this.form = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, 1)),
      end: new UntypedFormControl(new Date(year, month, 15)),
    });

    //this._changeDetectorRef.detectChanges();
  }
  filterDataChanged() {
    const startValue = this.form.get('start')?.value;
    const endValue = this.form.get('end')?.value;
    console.log('filterDataChanged');
    // if both the dates are valid then process it further
    if (startValue && endValue) {
      console.log('encontro valores=', startValue, endValue);
      // adding the hours and time zone offset
      if (startValue !== undefined && startValue !== null) {
        this.fromDate = new Date(startValue);
        this.fromDate.setHours(this.fromDate.getHours() + this.fromDate.getTimezoneOffset() / -60);
      }
      if (endValue !== undefined && endValue !== null) {
        this.toDate = new Date(endValue);
        this.toDate.setHours(this.toDate.getHours() + this.toDate.getTimezoneOffset() / -60);
      }

      // fetch data for filter criterion
      //this.filterChanged.emit({ fromDate: this.fromDate.toISOString(), toDate: this.toDate.toISOString(), application: this.selectedApplication??'' });
    } else {
      console.log('no encontro valores');
      // if date picker is blank then it is not valid dates but in this case we need to fetch all data. That's why calling the api with blank dates
      if (
        startValue === null &&
        endValue === null &&
        this.form.controls.start.errors === null &&
        this.form.controls.end.errors === null
      ) {
        //this.filterChanged.emit({ fromDate: '', toDate: '', application: this.selectedApplication??'' });
      }
    }
  }
  evaluateDate(event, type) {
    console.log('pasoooo');
  }
  public onChangeFrom(event: any): void {
    const formatted = event.value ? DateTime.fromJSDate(event.value).toFormat('M/d/yyyy') : '';
    console.log('onChangeFrom', formatted);
  }
  public onChangeTo(event: any): void {
    const formatted = event.value ? DateTime.fromJSDate(event.value).toFormat('M/d/yyyy') : '';
    console.log('onChangeTo', formatted);
  }
}
