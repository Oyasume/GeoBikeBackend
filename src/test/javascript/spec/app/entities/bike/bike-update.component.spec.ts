import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GeoBikeTestModule } from '../../../test.module';
import { BikeUpdateComponent } from 'app/entities/bike/bike-update.component';
import { BikeService } from 'app/entities/bike/bike.service';
import { Bike } from 'app/shared/model/bike.model';

describe('Component Tests', () => {
  describe('Bike Management Update Component', () => {
    let comp: BikeUpdateComponent;
    let fixture: ComponentFixture<BikeUpdateComponent>;
    let service: BikeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GeoBikeTestModule],
        declarations: [BikeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BikeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BikeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BikeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bike(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Bike();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
