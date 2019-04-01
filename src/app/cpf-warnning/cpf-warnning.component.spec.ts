import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfWarnningComponent } from './cpf-warnning.component';

describe('CpfWarnningComponent', () => {
  let component: CpfWarnningComponent;
  let fixture: ComponentFixture<CpfWarnningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpfWarnningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfWarnningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
