import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  Optional,
  Output,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Actions, Colors, Styles, ThemingService } from 'atlas-cdk';
import { ProgressFileInfo } from './filedrop.const';
import { config } from './filedrop.theming';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'atlas-filedrop',
  template: `
    <div
      [ngClass]="[
        'atlas-filedrop',
        finishUpload && !hasError.status ? 'atlas-filedrop--success' : '',
        hasError.status ? 'atlas-filedrop--failure' : ''
      ]"
      [class.atlas-filedrop--standard-width]="!fullWidth"
      [class.atlas-filedrop--full-width]="fullWidth"
      haloDragAndDrop
      [disabled]="finishUpload || disabled"
      (fileDropped)="onFileDropped($event)"
    >
      <input
        class="atlas-filedrop-input"  
        type="file"
        #fileDropRef
        id="fileDropRef"
        multiple
        [accept]="accept"
        (change)="fileBrowseHandler($event.target)"
        [disabled]="(finishUpload && !multipleFiles) || disabled"
        [attr.tabindex]="tabIndex"
        [attr.aria-label]="ariaLabel"
      />
      <ng-container *ngIf="!files.length; then emptyFiles; else withFiles"></ng-container>
      <ng-template #emptyFiles>
        <div [ngClass]="['atlas-filedrop-content', typographyContent]">
          {{ content }}
        </div>
        <atlas-button [color]="action ? action : color" [style]="style" [disabled]="disabled">{{ captionButton }}</atlas-button>
      </ng-template>
      <ng-template #withFiles>
        <ng-container *ngIf="finishUpload; then finish; else showProgress"></ng-container>
        <ng-template #finish>
          <div
            *ngFor="let item of files; let i = index"
            [ngClass]="[
              'atlas-filedrop-content atlas-filedrop-content-uploaded box-shadow-elevation-raised',
              typographyContent
            ]"
          >
            <atlas-icon [icon]="'icon-check-24'" [color]="colorIcon" [size]="size"></atlas-icon>
            <span class="atlas-filedrop-file-title">{{ item.file.name | shortenMiddle:MAX_FILENAME_CHARS }}</span>
            <atlas-icon-button
              [icon]="'icon-remove-24'"
              [color]="colorRmv"
              [size]="size"
              (onClick)="deleteFile(i)"
            ></atlas-icon-button>
          </div>
          <ng-container *ngIf="multipleFiles">
            <div [ngClass]="['atlas-filedrop-content', typographyContent]">
              {{ content }}
            </div>
            <atlas-button
              [color]="action ? action : color"
              [style]="style"
              (onClick)="openFileSelector()"
              [ngStyle]="{ position: 'relative', 'z-index': 3 }"
              >{{ captionButton }}</atlas-button
            >
          </ng-container>
        </ng-template>
        <ng-template #showProgress>
          <ng-container *ngFor="let item of files; let i = index">
            <div class="atlas-filedrop-progress">
              <div [ngClass]="['atlas-filedrop-progress-name', 'typographyStyles-body-small']">
                {{ item.file.name | shortenMiddle:MAX_FILENAME_CHARS }}
              </div>
              <atlas-progress [labeled]="true" [value]="item.progress"></atlas-progress>
            </div>
          </ng-container>
          <atlas-button
            class="atlas-filedrop-cancel"
            [color]="action ? action : color"
            [style]="style"
            (onClick)="onCanceledUpload()"
            >{{ cancelButton }}</atlas-button
          >
        </ng-template>
      </ng-template>
    </div>
    <span class="atlas-filedrop-error-message typographyStyles-body-small">{{hasError.message}}</span>
  `,
  host: {
    '[attr.role]': 'filedrop',
    '[attr.disabled]': 'disabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FiledropComponent implements ControlValueAccessor, AfterViewInit {
  /** Typography for the message content. */
  @Input() typographyContent: string = 'typographyStyles-body-medium';

  /** Set the file drop to upload multiple files */
  @Input() multipleFiles = false;

  /** Set the file drop to full width */
  @Input() fullWidth = false;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Select the action color of the button
   */
  @Input() action: Actions;

  /** Select the color of the button */
  @Input() color: Colors = Colors.brand;
  /**
   *
   * The style in the buttons
   */
  @Input() style: Styles = Styles.strong;

  /** Set message of the content */
  @Input() content: string = 'Drop files here to upload...';

  /** Set caption message of the browse files button */
  @Input() captionButton: string = 'Browse files';

  /** Set caption message of the cancel button */
  @Input() cancelButton: string = 'Cancel';

  /** Set a filter for the file types the user can choose from in the file input dialog */
  @Input() accept: string = '';

  /** Set disabled prop to filedrop */
  @Input() disabled: boolean = false;

  /** Set progress file info */
  @Input()
  set updateProgressInfo(value: ProgressFileInfo[]) {
    this._progressFileInfo = value;
    this.updateProgressFile(this._progressFileInfo);
  }
  private _progressFileInfo: ProgressFileInfo[] = [];

  /**
   * Canceled upload event
   */
  @Output() canceledUpload: EventEmitter<boolean> = new EventEmitter();

  /**
   * Selected files event
   */
  @Output() selectedFiles: EventEmitter<ProgressFileInfo[]> = new EventEmitter();

  /**
   *  @internal
   *  Upload completed event .
   */
  @Output() uploadCompleted: EventEmitter<boolean> = new EventEmitter();

  /**
   *  @internal
   *  Upload with errors event .
   */
  @Output() uploadFail: EventEmitter<any> = new EventEmitter();

  /** @internal */
  colorRmv: Colors = Colors.danger;
  /** @internal */
  colorIcon: Colors = Colors.brand;
  /** @internal */
  size: IconSizes = IconSizes.small;

  /** @internal */
  hasError: any = {
    status: false,
    message: '',
  };

  onCheckChange: any = () => {};
  onTouch: any = () => {};

  /** @internal */
  files: ProgressFileInfo[] = [];
  /** @internal */
  finishUpload: boolean = false;

  /** Tab index of the component */
  @Input('tabindex') tabindex = 0;

  /** @internal */
  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : `${this.tabindex}`;
  }

  /** Aria label of filedrop. */
  @Input('aria-label') ariaLabel = '';

  @ViewChild('fileDropRef', { static: false }) fileInput: ElementRef;

  MAX_FILENAME_CHARS: number = 30;
  constructor(
    private _cd: ChangeDetectorRef,
    private _themingService: ThemingService,
    private zone: NgZone,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    this._themingService.applyConfig(config);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /** @internal */
  ngAfterViewInit(){
    this.updateMaxLength();
    this._cd.detectChanges();
  }

  /** @internal */
  @HostListener('window:resize')
  onResize() {
    this.updateMaxLength();
  }


  /** @internal */
  updateMaxLength() {
    if (!this.fileInput) return;
    const WIDTH_OFFSET_FILEDROP = this.fileInput.nativeElement.offsetWidth;
    console.log('Filedrop width: ', this.fileInput.nativeElement.offsetWidth);
    console.log('Filedrop width offset: ', this.MAX_FILENAME_CHARS);
    this.MAX_FILENAME_CHARS =  Math.min(Math.floor(WIDTH_OFFSET_FILEDROP / 8),47);
    console.log('Max filename chars: ', this.MAX_FILENAME_CHARS);
  }
  

  /** @internal */
  writeValue(uploaded: boolean) {
    this.finishUpload = uploaded;
  }

  /**
   * handle file dropped into input
   * @internal
   */
  onFileDropped(event: any) {
    if (!this.multipleFiles && this.files.length >= 1) {
      this.uploadFail.emit(event);
      this.hasError = {
        status: true,
        message: "Can't upload more than one file",
      };
      throw new Error("Can't upload more than one file");
    } else if (!this.multipleFiles && event.length > 1) {
      this.uploadFail.emit(event);
      this.hasError = {
        status: true,
        message: "Can't upload more than one file",
      };
      throw new Error("Can't upload more than one file");
    } else if (!this.validateFileTypes(event)) {
      return;
    } else {
      this.hasError.status = false;
      this.hasError.message = '';
      this.prepareFilesList(event);
      this.fileInput.nativeElement.value = '';
    }
  }

  /**
   * handle file from browsing
   * @internal
   */
  fileBrowseHandler(event: any) {
    if (!this.multipleFiles && this.files.length >= 1) {
      this.uploadFail.emit(event);
      this.hasError = {
        status: true,
        message: "Can't upload more than one file",
      };
      throw new Error("Can't upload more than one file");
    } else if (!this.multipleFiles && event.files.length > 1) {
      this.uploadFail.emit(event);
      this.hasError = {
        status: true,
        message: "Can't upload more than one file",
      };
      throw new Error("Can't upload more than one file");
    } else {
      this.hasError.status = false;
      this.hasError.message = '';
      this.prepareFilesList(event.files);
      this.fileInput.nativeElement.value = '';
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   * @internal
   */
  deleteFile(indexToRemove: number) {
    this.files = this.files.filter((item, index) => index !== indexToRemove);
    this.files = this.files.map((item, index) => {
      return { ...item, index: index };
    });
    if (!this.multipleFiles) {
      this.finishUpload = false;
    } else if (this.files.length === 0) {
      this.finishUpload = false;
    }
    this.selectedFiles.emit(this.files);
  }

  /** @internal */
  registerOnChange(fn: any): void {
    this.onCheckChange = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /** @internal */
  openFileSelector() {
    this.zone.run(() => {
      this.fileInput.nativeElement.click();
    });
  }

  /** @internal */
  onCanceledUpload(): void {
    this.files = [];
    this.finishUpload = false;
    this.canceledUpload.emit(true);
    this.hasError = {
      status: true,
      message: 'Upload canceled by user.',
    };
    this._cd.detectChanges();
  }

  /**
   * @internal
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    let index;
    if (!this.multipleFiles) {
      this.files = [];
      index = 0;
    } else {
      index = this.files.length;
    }
    for (const item of files) {
      this.files.push({ file: item, index, progress: 0 });
      index++;
    }
    this.updateProgressFile(this.files);
    this.selectedFiles.emit(this.files);
  }

  private validateFileTypes(fileList: File[] | FileList): boolean {
    if (!this.accept) return true;

    const acceptTypes = this.accept.split(',').map((type) => type.trim());
    for (const file of Array.from(fileList)) {
      const isValid = acceptTypes.some((type) =>
        type.startsWith('.')
          ? file.name.toLowerCase().endsWith(type.toLowerCase())
          : file.type === type || file.type.startsWith(type.split('/')[0] + '/'),
      );
      if (!isValid) {
        this.hasError = {
          status: true,
          message: `File type not allowed: ${file.name}`,
        };
        this.uploadFail.emit(file);
        return false;
      }
    }
    return true;
  }

  private updateProgressFile(files: ProgressFileInfo[]): void {
    try {
      if (files.length === 0) {
        this.finishUpload = false;
        return;
      }

      let countCompleted = 0;
      files.forEach((element) => {
        if (element.progress >= 100) {
          countCompleted++;
        } else {
          element.progress += 10;
          this.files = [...files];
        }
      });

      if (this.multipleFiles) {
        if (countCompleted < files.length) {
          this.updateProgressFile(this.files);
        } else {
          this.uploadCompleted.emit(true);
          this.finishUpload = true;
        }
      } else {
        if (files.length === 1 && files[0].progress >= 100) {
          this.uploadCompleted.emit(true);
          this.finishUpload = true;
        } else if (files.length > 0) {
          this.updateProgressFile(this.files);
        }
      }
    } catch (error) {
      this.uploadFail.emit(error);
      this.hasError = {
        status: true,
        message: error.message || 'An error occurred during file upload.',
      };
    }
  }
}