import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeoBikeTestModule } from '../../../test.module';
import { BikeComponent } from 'app/entities/bike/bike.component';
import { BikeService } from 'app/entities/bike/bike.service';
import { Bike } from 'app/shared/model/bike.model';

describe('Component Tests', () => {
  describe('Bike Management Component', () => {
    let comp: BikeComponent;
    let fixture: ComponentFixture<BikeComponent>;
    let service: BikeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GeoBikeTestModule],
        declarations: [BikeComponent],
      })
        .overrideTemplate(BikeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BikeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BikeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Bike(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bikes && comp.bikes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
