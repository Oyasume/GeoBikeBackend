import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITravel } from 'app/shared/model/travel.model';
import { TravelService } from './travel.service';

@Component({
  templateUrl: './travel-delete-dialog.component.html',
})
export class TravelDeleteDialogComponent {
  travel?: ITravel;

  constructor(protected travelService: TravelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.travelService.delete(id).subscribe(() => {
      this.eventManager.broadcast('travelListModification');
      this.activeModal.close();
    });
  }
}
