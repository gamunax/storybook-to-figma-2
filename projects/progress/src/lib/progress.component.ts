import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { Colors, ThemingService } from "atlas-cdk";
import { config } from "./progress.theming";

/**
 * Progress indicators commonly known as spinners, express an unspecified wait time or display the length of a process.They could be Linear or Circular and depending on whether the progress of the process is known or not,  they could be Determinate or Indeterminate.
 */
@Component({
  selector: "atlas-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent {
  /**
   * Set the type of the progress bar. Can be selected between `divider` and `circular`.
   */
 @Input() type: string = "divider";

  /**
   * Select the type of bar for the divider's progress bar. Can be choose from `simple`, `indeterminate`,`buffer`.
   */
  @Input() barStyle: string = "simple";

  /**
   * Value of the progress bar represents the progress of the operation. It is represented as a percentage.
   */
  @Input() value: number = 0;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the variant color for the progress bar.
   */
  @Input() variant: string;

  /**
   * Set the variant color for the progress bar.
  */
  @Input() color: Colors = Colors.brand;

  /**
   * Whether or not the progress bar shows the label
   */
  @Input() labeled: boolean = false;

  constructor(private themingService: ThemingService) {
    this.themingService.applyConfig(config);
  }

  calculateBackground(color,progressValue) {
    return `conic-gradient(
            ${config["circular-bar"].progress.color[`${color}`]?.value?.background} ${progressValue * 3.6}deg,
            #ffffff ${progressValue * 3.6}deg
          )`;
  }
}
