import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GeoBikeTestModule } from '../../../test.module';
import { TravelComponent } from 'app/entities/travel/travel.component';
import { TravelService } from 'app/entities/travel/travel.service';
import { Travel } from 'app/shared/model/travel.model';

describe('Component Tests', () => {
  describe('Travel Management Component', () => {
    let comp: TravelComponent;
    let fixture: ComponentFixture<TravelComponent>;
    let service: TravelService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GeoBikeTestModule],
        declarations: [TravelComponent],
      })
        .overrideTemplate(TravelComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TravelComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TravelService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Travel(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.travels && comp.travels[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
