import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GeoBikeTestModule } from '../../../test.module';
import { TravelDetailComponent } from 'app/entities/travel/travel-detail.component';
import { Travel } from 'app/shared/model/travel.model';

describe('Component Tests', () => {
  describe('Travel Management Detail Component', () => {
    let comp: TravelDetailComponent;
    let fixture: ComponentFixture<TravelDetailComponent>;
    const route = ({ data: of({ travel: new Travel(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GeoBikeTestModule],
        declarations: [TravelDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TravelDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TravelDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load travel on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.travel).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
