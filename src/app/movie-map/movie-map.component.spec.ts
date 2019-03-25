import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMapComponent } from './movie-map.component';

describe('MovieMapComponent', () => {
  let component: MovieMapComponent;
  let fixture: ComponentFixture<MovieMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
