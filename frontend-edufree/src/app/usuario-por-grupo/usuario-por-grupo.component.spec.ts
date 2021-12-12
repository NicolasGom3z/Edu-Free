import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPorGrupoComponent } from './usuario-por-grupo.component';

describe('UsuarioPorGrupoComponent', () => {
  let component: UsuarioPorGrupoComponent;
  let fixture: ComponentFixture<UsuarioPorGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPorGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPorGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
