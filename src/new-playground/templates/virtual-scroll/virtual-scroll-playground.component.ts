import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Colors } from 'atlas-cdk';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, throttleTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'virtual-scroll-playground',
  templateUrl: './virtual-scroll-playground.component.html',
  styleUrls: ['./virtual-scroll-playground.component.scss'],
})
export class VirtualScrollPlayground implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  private scrollListeners: { element: Element, type: string, listener: EventListener }[] = [];
  private scrollSubscription: Subscription;
  private lastLoadedIndex = 0;
  public isLoading = false;


   popoverTitle = 'Table with Virtual Scrolling';
  /**
   * Sets in which direction the popover opens.
   */
   position = 'center';
  /**
   * Elevation for the popover content.
   */
   elevation = 'raised';
  /**
   * Show or hide the X close button.
   */
   showCloseButton = true;

  /**
   * Sets the width of popover.
   */
   defaultWidth = 800;



  colors = Colors;

  // Virtual scrolling properties
  itemSize = 35; // Height of each row in pixels
  headerHeight = 56; // Height of the table header in pixels
  bufferSize = 5; // Number of items to render beyond visible area

  public columnDef = [
   {
     fieldKey: 'age',
     displayLabel: 'Age',
     sortable: false,
   },
   {
     fieldKey: 'name',
     displayLabel: 'Name',
     sortable: false,
   },
   {
     fieldKey: 'birthplace',
     displayLabel: 'Birthplace',
     sortable: false,
   },
   {
     fieldKey: 'cars',
     displayLabel: 'Cars',
     sortable: false,
   },
   {
     fieldKey: 'f',
     displayLabel: 'Letter',
     sortable: false,
   },
   {
     fieldKey: 'email',
     displayLabel: 'Email',
     sortable: false,
   },
   {
     fieldKey: 'phone',
     displayLabel: 'Phone',
     sortable: false,
   },
   {
     fieldKey: 'status',
     displayLabel: 'Status',
     sortable: false,
   }
 ];
  public rows = [];

  names = ['Kevin', 'Helen', 'Matt', 'Robert', 'John', 'Sarah', 'Michael', 'Lisa'];
  birthplaces = ['New York', 'California', 'Florida', 'Connecticut', 'Texas', 'Arizona', 'Colorado', 'Washington'];
  cars = ['Ford', 'Infiniti', 'Toyota', 'Subaru', 'Tesla', 'BMW', 'Audi', 'Honda'];
  domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.org', 'example.net'];
  statuses = ['Active', 'Inactive', 'Pending', 'Suspended', 'Completed'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Generate a large dataset for virtual scrolling
    console.log('Initializing virtual scrolling with large dataset');
    this.generateLargeDataset(10);
  }

  ngAfterViewInit() {
    // Set up scroll sync after a short delay to ensure elements are rendered
    setTimeout(() => {
      this.setupScrollSync();
      this.setupInfiniteScroll();
    }, 500);
  }

  ngOnDestroy() {
    // Clean up scroll listeners to prevent memory leaks
    this.scrollListeners.forEach(({ element, type, listener }) => {
      element.removeEventListener(type, listener);
    });

    // Unsubscribe from scroll events
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  /**
   * Sets up infinite scrolling to load more data when reaching the bottom
   */
  setupInfiniteScroll(): void {
    if (!this.virtualScroll) {
      console.warn('Virtual scroll viewport not found for infinite scroll');
      return;
    }

    // Unsubscribe from any previous subscription
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

    // Subscribe to index changes to detect when we're near the end
    this.scrollSubscription = this.virtualScroll.elementScrolled().pipe(
      // Add a small delay to avoid multiple triggers
      throttleTime(200),
      // Get the current scroll position
      map(() => {
        const scrollOffset = this.virtualScroll.measureScrollOffset('bottom');
        const endReached = scrollOffset < 200; // If less than 200px from bottom
        return endReached;
      }),
      // Only emit when reaching the end
      filter(isNearEnd => isNearEnd)
    ).subscribe(() => {
      this.loadMoreData();
    });

    console.log('Infinite scroll detection set up');
  }

  /**
   * Adds 10 more rows of data when scroll reaches the bottom
   */
  loadMoreData(): void {
    // Prevent multiple simultaneous loads
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    // Trigger change detection to show the loading indicator immediately
    this.cdr.detectChanges();
    
    console.log('Loading more data...');

    // Simulate a small delay like in real API calls
    setTimeout(() => {
      this.addMoreRecords(10);
      this.isLoading = false;
      // Trigger change detection again after setting isLoading to false
      this.cdr.detectChanges();
    }, 300);
  }

  /**
   * Adds more records to the existing data set
   * @param count Number of records to add
   */
  addMoreRecords(count: number): void {
    console.log(`Adding ${count} more records...`);
    const newRows = [];
    for (let i = 0; i < count; i++) {
      const index = this.lastLoadedIndex + i;
      const name = this.names[index % this.names.length];
      newRows.push({
        age: (index % 50 + 18).toString(),
        name: name,
        birthplace: this.birthplaces[index % this.birthplaces.length],
        cars: this.cars[index % this.cars.length],
        f: String.fromCharCode(97 + (index % 26)), // a-z letters
        email: `${name.toLowerCase()}${index}@${this.domains[index % this.domains.length]}`,
        phone: `(${100 + index % 900}) ${100 + index % 900}-${1000 + index % 9000}`,
        status: this.statuses[index % this.statuses.length]
      });
    }
    
    // Update the last loaded index for future loads
    this.lastLoadedIndex += count;
    
    // Add new rows to the existing array
    this.rows = [...this.rows, ...newRows];
    
    console.log(`Added ${count} more rows. Total rows now: ${this.rows.length}`);
    
    // Force change detection to update the UI
    this.cdr.detectChanges();
    
    // Check if the virtual scroll viewport needs to be refreshed
    if (this.virtualScroll) {
      this.virtualScroll.checkViewportSize();
    }
  }

  /**
   * Generates a large dataset for testing virtual scrolling
   * @param count Number of rows to generate
   */
  generateLargeDataset(count: number): void {
    this.rows = [];
    for (let i = 0; i < count; i++) {
      const name = this.names[i % this.names.length];
      this.rows.push({
        age: (i % 50 + 18).toString(),
        name: name,
        birthplace: this.birthplaces[i % this.birthplaces.length],
        cars: this.cars[i % this.cars.length],
        f: String.fromCharCode(97 + (i % 26)), // a-z letters
        email: `${name.toLowerCase()}${i}@${this.domains[i % this.domains.length]}`,
        phone: `(${100 + i % 900}) ${100 + i % 900}-${1000 + i % 9000}`,
        status: this.statuses[i % this.statuses.length]
      });
    }
    
    // Set initial last loaded index
    this.lastLoadedIndex = count;
    
    console.log(`Generated ${this.rows.length} rows for virtual scrolling`);
    
    // Force change detection to ensure initial data renders
    this.cdr.detectChanges();
  }

  onHide(event: any): void {
    console.log('popover closed');
  }

  onClickButtonPopover(event: any): void {
    console.log('Popover button clicked, opening virtual scrolling table');
  }

  public onInputChange(event: any): void {
    console.log('onchange datepicker', event);
  }

  /**
   * Sets up synchronization between the header and body scrolling
   */
  setupScrollSync(): void {
    const headerScrollContainers = document.querySelectorAll('.table-header-container .horizontal-scroll-container');
    const bodyScrollContainers = document.querySelectorAll('.virtual-scroll-viewport .horizontal-scroll-container');
    
    if (!headerScrollContainers.length || !bodyScrollContainers.length) {
      console.warn('Could not find horizontal scroll containers for sync');
      return;
    }
    
    // For each body scroll container, set up bidirectional scroll sync with its corresponding header
    bodyScrollContainers.forEach((bodyContainer, index) => {
      if (index < headerScrollContainers.length) {
        const headerContainer = headerScrollContainers[index];
        
        // When the body container scrolls horizontally, sync the header
        const bodyScrollListener = () => {
          headerContainer.scrollLeft = bodyContainer.scrollLeft;
        };
        bodyContainer.addEventListener('scroll', bodyScrollListener);
        this.scrollListeners.push({ 
          element: bodyContainer, 
          type: 'scroll', 
          listener: bodyScrollListener 
        });
        
        // When the header scrolls horizontally, sync the body container
        const headerScrollListener = () => {
          bodyContainer.scrollLeft = headerContainer.scrollLeft;
        };
        headerContainer.addEventListener('scroll', headerScrollListener);
        this.scrollListeners.push({ 
          element: headerContainer, 
          type: 'scroll', 
          listener: headerScrollListener 
        });
        
        // Initial sync to ensure they're aligned
        setTimeout(() => {
          headerContainer.scrollLeft = bodyContainer.scrollLeft;
        }, 100);
      }
    });
    
    console.log('Bidirectional horizontal scroll synchronization set up');
    
    // Force scroll to beginning initially
    setTimeout(() => {
      headerScrollContainers.forEach(container => {
        container.scrollLeft = 0;
      });
      
      bodyScrollContainers.forEach(container => {
        container.scrollLeft = 0;
      });
    }, 200);
  }
}