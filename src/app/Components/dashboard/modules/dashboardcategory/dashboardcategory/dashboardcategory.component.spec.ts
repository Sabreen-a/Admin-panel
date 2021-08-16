import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcategoryComponent } from './dashboardcategory.component';

describe('DashboardcategoryComponent', () => {
  let component: DashboardcategoryComponent;
  let fixture: ComponentFixture<DashboardcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardcategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
