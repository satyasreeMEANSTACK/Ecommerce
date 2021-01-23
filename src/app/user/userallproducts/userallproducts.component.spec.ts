import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallproductsComponent } from './userallproducts.component';

describe('UserallproductsComponent', () => {
  let component: UserallproductsComponent;
  let fixture: ComponentFixture<UserallproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserallproductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserallproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
