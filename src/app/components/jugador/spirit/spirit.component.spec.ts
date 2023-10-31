import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiritComponent } from './spirit.component';

describe('SpiritComponent', () => {
  let component: SpiritComponent;
  let fixture: ComponentFixture<SpiritComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpiritComponent]
    });
    fixture = TestBed.createComponent(SpiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
