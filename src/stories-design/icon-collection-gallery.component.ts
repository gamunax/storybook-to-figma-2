import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'icon-collection-gallery',
  template: `
    <input
      type="text"
      [(ngModel)]="search"
      placeholder="Search icon by name or collection"
      class="icon-search-input"
      aria-label="Search icons"
    />
    <ul class="icon-list" role="list">
      <li *ngFor="let icon of filteredIcons(); trackBy: trackByIcon; let i = index" class="icon-list-item">
        <span class="icon-tooltip-wrapper"
              tabindex="0"
              role="button"
              aria-label="Copy icon usage to clipboard"
              (mouseenter)="onTooltipEnter(i)"
              (mouseleave)="onTooltipLeave()"
              (focus)="onTooltipEnter(i)"
              (blur)="onTooltipLeave()"
              (click)="copyIconLink(icon, i)">
          <atlas-icon [icon]="icon.icon" [collection]="icon.collection"></atlas-icon>
          <span class="icon-tooltip" *ngIf="tooltipIndex === i">
            {{ copiedIndex === i ? 'copied to clipboard!!' : 'click to copy' }}
          </span>
        </span>
        <p class="icon-label typographyStyles-label-small">{{icon.icon || 'unknown'}}/{{icon.collection || 'unknown'}}</p>
      </li>
    </ul>
  `,
  styles: [`
    .icon-search-input {
      margin: 1em 0;
      padding: 0.5em;
      width: 100%;
      max-width: 400px;
      font-size: 1em;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    .icon-list {
      background-color: var(--neutral-200);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding-left: 0;
      list-style: none;
    }
    .icon-list-item {
      border-radius: .4em;
      transition: background-color .2s;
      user-select: none;
      overflow: hidden;
      text-align: center;
      padding: 2em 1em 1em;
    }
    .icon-tooltip-wrapper {
      position: relative;
      display: inline-block;
      cursor: pointer;
      outline: none;
    }
    .icon-tooltip {
      visibility: visible;
      opacity: 1;
      background-color: #f6f9fc;
      color: #242323;
      text-align: center;
      border-radius: 4px;
      padding: 4px 8px;
      position: absolute;
      z-index: 1;
      bottom: 110%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.8em;
      white-space: nowrap;
      pointer-events: none;
      transition: opacity 0.2s;
      min-width: 80px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .icon-label {
      margin-top: 0.5em;
      word-break: break-all;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCollectionGalleryComponent {
  @Input() icons: { icon: string, collection: string }[] = [];
  search = '';
  copiedIndex: number | null = null;
  tooltipIndex: number | null = null;

  // Filter icons by search string
  filteredIcons() {
    if (!this.icons) return [];
    return this.icons.filter(
      ({ icon, collection }) =>
        (icon || '').toLowerCase().includes(this.search.toLowerCase()) ||
        (collection || '').toLowerCase().includes(this.search.toLowerCase())
    );
  }

  // Copy icon usage HTML to clipboard
  copyIconLink(icon: { icon: string, collection: string }, index: number) {
    const html = `<atlas-icon icon=\"${icon.icon}\" collection=\"${icon.collection}\"></atlas-icon>`;
    navigator.clipboard.writeText(html);
    this.copiedIndex = index;
    this.tooltipIndex = index;
    setTimeout(() => {
      this.copiedIndex = null;
    }, 1200);
  }

  // Show tooltip on hover/focus
  onTooltipEnter(index: number) {
    this.tooltipIndex = index;
  }

  // Hide tooltip on mouse leave/blur
  onTooltipLeave() {
    this.tooltipIndex = null;
  }

  // TrackBy function for *ngFor
  trackByIcon(index: number, item: { icon: string, collection: string }) {
    return item.icon + '|' + item.collection;
  }
}