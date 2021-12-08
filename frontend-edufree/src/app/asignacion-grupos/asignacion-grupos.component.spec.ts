import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionGruposComponent } from './asignacion-grupos.component';

describe('AsignacionGruposComponent', () => {
  let component: AsignacionGruposComponent;
  let fixture: ComponentFixture<AsignacionGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
