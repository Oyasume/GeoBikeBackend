import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBike } from 'app/shared/model/bike.model';
import { BikeService } from './bike.service';
import { BikeDeleteDialogComponent } from './bike-delete-dialog.component';

@Component({
  selector: 'jhi-bike',
  templateUrl: './bike.component.html',
})
export class BikeComponent implements OnInit, OnDestroy {
  bikes?: IBike[];
  eventSubscriber?: Subscription;

  constructor(
    protected bikeService: BikeService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.bikeService.query().subscribe((res: HttpResponse<IBike[]>) => (this.bikes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBikes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBike): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInBikes(): void {
    this.eventSubscriber = this.eventManager.subscribe('bikeListModification', () => this.loadAll());
  }

  delete(bike: IBike): void {
    const modalRef = this.modalService.open(BikeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bike = bike;
  }
}
