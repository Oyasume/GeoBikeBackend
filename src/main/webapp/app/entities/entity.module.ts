import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'bike',
        loadChildren: () => import('./bike/bike.module').then(m => m.GeoBikeBikeModule),
      },
      {
        path: 'travel',
        loadChildren: () => import('./travel/travel.module').then(m => m.GeoBikeTravelModule),
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.GeoBikeLocationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GeoBikeEntityModule {}
