import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPublicadoresPage } from './lista-publicadores.page';

describe('ListaPublicadoresPage', () => {
  let component: ListaPublicadoresPage;
  let fixture: ComponentFixture<ListaPublicadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPublicadoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPublicadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
