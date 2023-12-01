import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMoedasComponent } from './listar-moedas.component';

describe('ListarMoedasComponent', () => {
  let component: ListarMoedasComponent;
  let fixture: ComponentFixture<ListarMoedasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarMoedasComponent]
    });
    fixture = TestBed.createComponent(ListarMoedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
