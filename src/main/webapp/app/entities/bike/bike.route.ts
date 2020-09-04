import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBike, Bike } from 'app/shared/model/bike.model';
import { BikeService } from './bike.service';
import { BikeComponent } from './bike.component';
import { BikeDetailComponent } from './bike-detail.component';
import { BikeUpdateComponent } from './bike-update.component';

@Injectable({ providedIn: 'root' })
export class BikeResolve implements Resolve<IBike> {
  constructor(private service: BikeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBike> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bike: HttpResponse<Bike>) => {
          if (bike.body) {
            return of(bike.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bike());
  }
}

export const bikeRoute: Routes = [
  {
    path: '',
    component: BikeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.bike.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BikeDetailComponent,
    resolve: {
      bike: BikeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.bike.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BikeUpdateComponent,
    resolve: {
      bike: BikeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.bike.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BikeUpdateComponent,
    resolve: {
      bike: BikeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.bike.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
