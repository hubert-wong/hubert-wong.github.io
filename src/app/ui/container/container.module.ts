import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainerComponent } from './main-container/main-container.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { WidgetWaterfallModule } from '../widgets/widget-waterfall/widget-waterfall.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [
    MainContainerComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule,
    MatDialogModule,
    WidgetWaterfallModule,
    SharedModule
  ],
  exports:[
    MainContainerComponent,
  ]
})
export class ContainerModule { }
