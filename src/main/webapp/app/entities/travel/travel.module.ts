import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeoBikeSharedModule } from 'app/shared/shared.module';
import { TravelComponent } from './travel.component';
import { TravelDetailComponent } from './travel-detail.component';
import { TravelUpdateComponent } from './travel-update.component';
import { TravelDeleteDialogComponent } from './travel-delete-dialog.component';
import { travelRoute } from './travel.route';

@NgModule({
  imports: [GeoBikeSharedModule, RouterModule.forChild(travelRoute)],
  declarations: [TravelComponent, TravelDetailComponent, TravelUpdateComponent, TravelDeleteDialogComponent],
  entryComponents: [TravelDeleteDialogComponent],
})
export class GeoBikeTravelModule {}
