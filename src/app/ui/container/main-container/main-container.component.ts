import { Platform } from '@angular/cdk/platform';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subscription } from 'rxjs';
import { ScrollEventService } from 'src/app/core/scroll/scroll-event.service';
import { ENTER_FORM_TOP } from '../../animations/transitions/transitions.constants';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  animations:[
    ENTER_FORM_TOP
  ]
})
export class MainContainerComponent implements OnInit {



    private _scrollTargetSubscription: Subscription | null = null;
  

    @ViewChild('contentScroller') vContentScroller?: ElementRef<HTMLElement>;
    
    constructor(
      private _ngZone: NgZone,
      private _platform: Platform,
      private _scrollService: ScrollEventService,
  
      public dialog: MatDialog
      ) { }
  
    ngOnInit(): void {
    }
    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      this._initScrollHandler();    
      this._scrollService.dispatchUpdate(this.vContentScroller);
      
    }
  
    ngOnDestroy(): void {
      //Called once, before the instance is destroyed.
      //Add 'implements OnDestroy' to the class.
      
      this._scrollService.dispatchUpdate(undefined);
    }
  
    
  
    private _initScrollHandler(): void {
      if (this._scrollTargetSubscription) {
        this._scrollTargetSubscription.unsubscribe();
      }
      if (!this._platform.isBrowser) {
        return;
      }  
  
      this._scrollTargetSubscription = this._ngZone.runOutsideAngular(() =>
        fromEvent<Event>(this.vContentScroller?.nativeElement || window, 'scroll')
          .subscribe((event) => this._ngZone.run(() => {
            this._scrollService.emitActionMainEvent(event);
            
          })));
    }

}
