import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GeoBikeSharedModule } from 'app/shared/shared.module';
import { BikeComponent } from './bike.component';
import { BikeDetailComponent } from './bike-detail.component';
import { BikeUpdateComponent } from './bike-update.component';
import { BikeDeleteDialogComponent } from './bike-delete-dialog.component';
import { bikeRoute } from './bike.route';

@NgModule({
  imports: [GeoBikeSharedModule, RouterModule.forChild(bikeRoute)],
  declarations: [BikeComponent, BikeDetailComponent, BikeUpdateComponent, BikeDeleteDialogComponent],
  entryComponents: [BikeDeleteDialogComponent],
})
export class GeoBikeBikeModule {}
