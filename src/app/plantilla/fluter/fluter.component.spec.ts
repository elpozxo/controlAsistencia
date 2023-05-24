import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluterComponent } from './fluter.component';

describe('FluterComponent', () => {
  let component: FluterComponent;
  let fixture: ComponentFixture<FluterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
