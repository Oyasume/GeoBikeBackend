import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITravel } from 'app/shared/model/travel.model';
import { TravelService } from './travel.service';
import { TravelDeleteDialogComponent } from './travel-delete-dialog.component';

@Component({
  selector: 'jhi-travel',
  templateUrl: './travel.component.html',
})
export class TravelComponent implements OnInit, OnDestroy {
  travels?: ITravel[];
  eventSubscriber?: Subscription;

  constructor(protected travelService: TravelService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.travelService.query().subscribe((res: HttpResponse<ITravel[]>) => (this.travels = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTravels();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITravel): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTravels(): void {
    this.eventSubscriber = this.eventManager.subscribe('travelListModification', () => this.loadAll());
  }

  delete(travel: ITravel): void {
    const modalRef = this.modalService.open(TravelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.travel = travel;
  }
}
