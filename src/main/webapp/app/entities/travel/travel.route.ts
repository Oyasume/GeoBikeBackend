import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITravel, Travel } from 'app/shared/model/travel.model';
import { TravelService } from './travel.service';
import { TravelComponent } from './travel.component';
import { TravelDetailComponent } from './travel-detail.component';
import { TravelUpdateComponent } from './travel-update.component';

@Injectable({ providedIn: 'root' })
export class TravelResolve implements Resolve<ITravel> {
  constructor(private service: TravelService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITravel> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((travel: HttpResponse<Travel>) => {
          if (travel.body) {
            return of(travel.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Travel());
  }
}

export const travelRoute: Routes = [
  {
    path: '',
    component: TravelComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.travel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TravelDetailComponent,
    resolve: {
      travel: TravelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.travel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TravelUpdateComponent,
    resolve: {
      travel: TravelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.travel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TravelUpdateComponent,
    resolve: {
      travel: TravelResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'geoBikeApp.travel.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
