import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITravel, Travel } from 'app/shared/model/travel.model';
import { TravelService } from './travel.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IBike } from 'app/shared/model/bike.model';
import { BikeService } from 'app/entities/bike/bike.service';

type SelectableEntity = IUser | IBike;

@Component({
  selector: 'jhi-travel-update',
  templateUrl: './travel-update.component.html',
})
export class TravelUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  bikes: IBike[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    user: [],
    bike: [],
  });

  constructor(
    protected travelService: TravelService,
    protected userService: UserService,
    protected bikeService: BikeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ travel }) => {
      this.updateForm(travel);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.bikeService.query().subscribe((res: HttpResponse<IBike[]>) => (this.bikes = res.body || []));
    });
  }

  updateForm(travel: ITravel): void {
    this.editForm.patchValue({
      id: travel.id,
      name: travel.name,
      user: travel.user,
      bike: travel.bike,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const travel = this.createFromForm();
    if (travel.id !== undefined) {
      this.subscribeToSaveResponse(this.travelService.update(travel));
    } else {
      this.subscribeToSaveResponse(this.travelService.create(travel));
    }
  }

  private createFromForm(): ITravel {
    return {
      ...new Travel(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      user: this.editForm.get(['user'])!.value,
      bike: this.editForm.get(['bike'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITravel>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
