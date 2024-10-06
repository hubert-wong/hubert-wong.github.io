import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

    // languages
    {
      "name": "Java",
      "logo": "assets/img/tools/java-logo.png",
      "link": "https://www.java.com/en/",
      "tab": "languages"
    },
    {
      "name": "Javascript",
      "logo": "assets/img/tools/javascript.png",
      "link": "https://www.javascript.com/",
      "tab": "languages",
      "color": "#c2ae15"
    },
    {
      "name": "Typescript",
      "logo": "assets/img/tools/typescript.png",
      "link": "https://www.typescriptlang.org/",
      "tab": "languages",
      "color": "#005b99"
    },
    {
      "name": "C",
      "logo": "assets/img/tools/c-logo.png",
      "link": "",
      "tab": "languages"
    },
    {
      "name": "C++",
      "logo": "assets/img/tools/c++.svg",
      "link": "https://cplusplus.com/",
      "tab": "languages"
    },
    {
      "name": "Python",
      "logo": "assets/img/tools/python.svg",
      "link": "https://www.python.org/",
      "tab": "languages",
      "color": "#407eaf"
    },
    {
      "name": "Go",
      "logo": "assets/img/tools/go.svg",
      "link": "https://go.dev/",
      "tab": "languages"
    },
    {
      "name": "Ruby",
      "logo": "assets/img/tools/ruby.svg",
      "link": "https://www.ruby-lang.org/en/",
      "tab": "languages"
    },
    // design
    {
      "name": "Figma",
      "logo": "assets/img/tools/figma.svg",
      "link": "https://www.figma.com/",
      "tab": "design"
    },
    // web
    {
      "name": "HTML",
      "logo": "assets/img/tools/html.svg",
      "link": "",
      "tab": "web"
    },
    {
      "name": "CSS",
      "logo": "assets/img/tools/css.svg",
      "link": "",
      "tab": "web"
    },
    {
      "name": "Sass",
      "logo": "assets/img/tools/sass-logo.svg",
      "link": "https://sass-lang.com/",
      "tab": "web",
      "color": "#CF649A"
    },
    {
      "name": "Ngrx",
      "logo": "assets/img/tools/ngrx.svg",
      "link": "https://ngrx.io/",
      "tab": "web"
    },

    // frameworks
    {
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "frameworks"
    },
    {
      "name": "React",
      "logo": "assets/img/tools/react.svg",
      "link": "https://react.dev/",
      "tab": "frameworks",
      "color": "#5e93a2"
    },
    {
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "frameworks",
      "color": "#FF4369"
    },
    // backend
    {
      "name": "MySQL",
      "logo": "assets/img/tools/mysql.png",
      "link": "https://www.mysql.com/",
      "tab": "backend"
    },
    {
      "name": "CassandraQL",
      "logo": "assets/img/tools/cassandra.svg",
      "link": "https://cassandra.apache.org/doc/stable/cassandra/cql/",
      "tab": "backend"
    },

    // cloud
    {
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },
    {
      "name": "AWS",
      "logo": "assets/img/tools/aws.svg",
      "link": "https://aws.amazon.com/",
      "tab": "cloud"
    },
    {
      "name": "Google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },


  ]

}
