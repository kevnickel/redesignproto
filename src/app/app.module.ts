import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { QualityHeatMapComponent } from './qualityheatmap.component';
import { SurgeonResultsComponent } from './surgeonresults.component';
import { StateService } from './services/states.service';
import { ProcedureCategoryService } from './services/procedure-categories.service';
import { MpiricaService } from './services/mpirica.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    QualityHeatMapComponent,
    SurgeonResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'surgeonresults',
        component: SurgeonResultsComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: '',
        redirectTo: '/map',
        pathMatch: 'full'
      },
      {
        path: 'surgeonresults/:id',
        component: SurgeonResultsComponent
      },
      {
        path: 'surgeonresults/:id/procedure/:id1',
        component: SurgeonResultsComponent
      }
    ])
  ],
  providers: [
    StateService,
    ProcedureCategoryService,
    MpiricaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
