import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBike } from 'app/shared/model/bike.model';
import { BikeService } from './bike.service';

@Component({
  templateUrl: './bike-delete-dialog.component.html',
})
export class BikeDeleteDialogComponent {
  bike?: IBike;

  constructor(protected bikeService: BikeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bikeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('bikeListModification');
      this.activeModal.close();
    });
  }
}
